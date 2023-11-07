#![cfg_attr(not(feature = "std"), no_std, no_main)]

///! Album smart contract prototype for Allfeat
///* TODO
///* - Implement payable_mint for AFT37 token
///* - Replace u16 by u8?
///
///* This contract integrates the functionality of the aft37 token standard
///* and metadata handling for each token, along with specific structures to manage albums and songs.
///* It is only a prototype, might be changed in the future by a new type of contract ( AFT38 specifically designed for albums )

/// Possible design for ipfs storage
/// ```json
/// {
///    "album": {
///      "id": "AlbumId",
///      "title": "Album title",
///      "description": "Song description",
///      "artists":  ["Main artist", "Artist 2", "Artist 3"],
///      "cover": "ipfs://Qm.../cover.jpg",
///      "price": "0.1",
///    }
/// }
///
/// {
///   "song": {
///       "id": "SongId",
///       "title": "Song title",
///       "description": "Song description",
///       "image": "ipfs://Qm.../cover.jpg",
///       "audio": "ipfs://Qm.../audio.mp3",
///       "price": "0.1"
///     }
/// }
/// ```
#[allfeat_contracts::implementation(AFT37, AFT37URIStorage)]
#[allfeat_contracts::contract]
pub mod albums {
    use allfeat_contracts::aft37::{self, extensions::uri_storage::URI};
    use ink::{prelude::vec, storage::Mapping};
    use openbrush::traits::{Storage, String};
    use scale::{Decode, Encode};

    /// The main contract structure.
    #[derive(Storage)]
    #[ink(storage)]
    pub struct Contract {
        /// The aft37 data structure, managing the balances, supply, and operator approvals.
        #[storage_field]
        data: aft37::Data,

        #[storage_field]
        uris: uri_storage::Data,

        /// The owner of the contract.
        owner: AccountId,

        /// A mapping of denied IDs. These IDs are not allowed to be used.
        /// Can be useful if you want to disable minting a specific song/entire album.
        denied_ids: Mapping<Id, ()>,

        /// A mapping of albums to their respective songs.
        /// - Key: AlbumId (a unique identifier for an album).
        /// - Value: A vector of SongIds (unique identifiers for songs).
        ///
        /// Logic:
        /// - Every time a new album is created, a unique AlbumId is generated.
        /// - Every song added to this album gets a unique SongId.
        /// - The AlbumId serves as the key in this mapping, and the associated SongIds are
        ///   stored in the vector as the value.
        /// - The combination of AlbumId and SongId ensures a unique identifier for each song
        ///   across all albums. The AlbumId occupies the higher 16 bits of a 32-bit ID, and
        ///   the SongId occupies the lower 16 bits.
        songs: Mapping<AlbumId, Vec<SongId>>,

        /// The current album ID. Used to generate next one.
        current_album_id: AlbumId,
    }

    /// AlbumId represents a unique identifier for an album.
    /// It uses 16 bits, allowing for a maximum of 2^16 or 65,536 unique albums.
    /// The AlbumId occupies the higher bits (16-31) of the combined 32-bit ID for a song.
    type AlbumId = u16;

    /// SongId represents a unique identifier for a song within a specific album.
    /// It uses 16 bits, allowing for a maximum of 2^16 or 65,536 unique songs per album.
    /// The SongId occupies the lower bits (0-15) of the combined 32-bit ID for a song.
    type SongId = u16;

    /// Combines an `AlbumId` and a `SongId` to produce a unique 32-bit identifier (`Id`).
    ///
    /// This function takes an `AlbumId` and a `SongId` (both 16 bits) and combines them to
    /// produce a unique 32-bit identifier (`Id`). The resulting `Id` can be used as a key
    /// for mappings or other data structures where a unique identification for a song within
    /// an album is needed.
    ///
    /// In order to create the Id of an AlbumId, just pass SongId as 0.
    ///
    /// Example:
    ///
    /// `AlbumId` : 0000000000010101 -> 21 in decimal
    /// `SongId`  : 0000000000000000 -> 0 in decimal
    /// `Id`      : 00000000000101010000000000000000 -> 1376256 in decimal
    ///
    /// So, the combined Id in binary is 00000000000101010000000000000000 which is 1376256 in decimal.
    ///
    /// - If `SongId`` is 0000000000000000, then it represents an album.
    /// - If SongId is anything other than 0000000000000000, it represents a song within the album specified by the AlbumId.
    fn combine_ids(album_id: AlbumId, song_id: SongId) -> Id {
        // Shift the AlbumId 16 bits to the left to make space for the SongId
        let album_part = (album_id as u32) << 16;
        // Combine the two parts using a bitwise OR to get a unique u32 identifier
        Id::U32(album_part | (song_id as u32))
    }

    /// Checks wheter the given `Id` is an `AlbumId`.
    fn is_album(id: &Id) -> bool {
        // Extract the SongId portion and check if it's 0
        match id {
            Id::U32(id) => (id & 0xFFFF) == 0,
            _ => false,
        }
    }

    #[derive(Encode, Decode, Debug, PartialEq, Eq, Copy, Clone)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub enum Error {
        NotOwner,
        InvalidAlbumId,
        InvalidSongId,
    }

    impl Contract {
        #[ink(constructor)]
        pub fn new(base_uri: Option<URI>, owner: AccountId) -> Self {
            let mut instance = Self {
                owner,
                data: aft37::Data::default(),
                denied_ids: Mapping::default(),
                songs: Mapping::default(),
                current_album_id: 0,
                uris: uri_storage::Data::default(),
            };

            uri_storage::Internal::_set_base_uri(&mut instance, base_uri);
            instance
        }

        #[ink(message)]
        pub fn set_token_uri(&mut self, token_id: Id, token_uri: URI) -> Result<(), Error> {
            // PANIC: unwrap is okay cause we are sure _set_token_uri will not fail
            uri_storage::Internal::_set_token_uri(self, token_id, token_uri).unwrap();
            Ok(())
        }

        /// Denies an ID from being used.
        #[ink(message)]
        pub fn deny(&mut self, album_id: AlbumId, song_id: SongId) {
            self.denied_ids.insert(&combine_ids(album_id, song_id), &());
        }

        /// Creates an album.
        #[ink(message)]
        pub fn create_album(&mut self, max_supply: Balance) -> Result<AlbumId, Error> {
            // Ensures caller is owner
            self.ensure_owner()?;

            // Increment current AlbumId counter
            self.current_album_id += 1;
            // Insert new album into songs mapping
            self.songs
                .insert(self.current_album_id, &Vec::<SongId>::new());

            // Mint max supply of album
            self.data
                .supply
                .insert(&Some(&combine_ids(self.current_album_id, 0)), &max_supply);
            Ok(self.current_album_id)
        }

        /// Creates a song within an album.
        #[ink(message)]
        pub fn create_song(
            &mut self,
            album_id: AlbumId,
            max_supply: Balance,
        ) -> Result<SongId, Error> {
            // Ensures caller is owner
            self.ensure_owner()?;

            let mut album = self.songs.get(album_id).ok_or(Error::InvalidAlbumId)?;
            let song_id = album.len() as SongId;

            // Add song into album
            album.push(song_id);

            // Mint max supply of song
            self.data
                .supply
                .insert(&Some(&combine_ids(album_id, song_id)), &max_supply);
            Ok(song_id)
        }

        /// Deletes an album.
        #[ink(message)]
        pub fn delete_album(&mut self, album_id: AlbumId) -> Result<(), Error> {
            // Ensures caller is owner
            self.ensure_owner()?;

            // Check if album id exists
            if self.songs.get(album_id).is_none() {
                return Err(Error::InvalidAlbumId);
            } else if (album_id == self.current_album_id) && (self.current_album_id > 0) {
                self.current_album_id -= 1;
            }

            // Remove album from songs mapping
            self.songs.remove(self.current_album_id);
            Ok(())
        }

        /// Deletes a song from an album.
        #[ink(message)]
        pub fn delete_song(&mut self, album_id: AlbumId, song_id: SongId) -> Result<(), Error> {
            // Ensures caller is owner
            self.ensure_owner()?;

            if let Some(album) = self.songs.get(album_id) {
                if album.get(song_id as usize).is_some() {
                    // Remove song from songs mapping
                    self.songs.remove(song_id);
                    Ok(())
                } else {
                    Err(Error::InvalidSongId)
                }
            } else {
                Err(Error::InvalidAlbumId)
            }
        }

        /// Mintes a new album to the caller.
        #[ink(message)]
        pub fn mint_album(&mut self, album_id: AlbumId, amount: Balance) -> Result<Id, AFT37Error> {
            let id = combine_ids(album_id, 0);

            if !is_album(&id) || self.denied_ids.get(&id).is_some() {
                return Err(AFT37Error::Custom(String::from("Id is denied")));
            }

            aft37::Internal::_mint_to(self, Self::env().caller(), vec![(id.clone(), amount)])?;
            Ok(id)
        }

        /// Mintes a new song to the caller.
        #[ink(message)]
        pub fn mint_song(
            &mut self,
            album_id: AlbumId,
            song_id: SongId,
            amount: Balance,
        ) -> Result<Id, AFT37Error> {
            let id = combine_ids(album_id, song_id);

            if self.denied_ids.get(&id).is_some() {
                return Err(AFT37Error::Custom(String::from("Id is denied")));
            }

            aft37::Internal::_mint_to(self, Self::env().caller(), vec![(id.clone(), amount)])?;
            Ok(id)
        }

        /// Verifies that the caller is the smart contract's owner.
        fn ensure_owner(&self) -> Result<(), Error> {
            match self.env().caller() == self.owner {
                true => Ok(()),
                false => Err(Error::NotOwner),
            }
        }
    }

    // #[cfg(all(test, feature = "e2e-tests"))]
    // pub mod tests {
    //     use allfeat_contracts::aft37::aft37_external::AFT37;

    //     #[rustfmt::skip]
    //     use super::*;
    //     #[rustfmt::skip]
    //     use ink_e2e::build_message;

    //     use test_helpers::{address_of, balance_of_37};

    //     type E2EResult<T> = Result<T, Box<dyn std::error::Error>>;

    //     #[ink_e2e::test]
    //     async fn balance_of_works(mut client: ink_e2e::Client<C, E>) -> E2EResult<()> {
    //         let constructor = ContractRef::new();
    //         let address = client
    //             .instantiate("albums", &ink_e2e::alice(), constructor, 0, None)
    //             .await
    //             .expect("instantiate failed")
    //             .account_id;

    //         let token_1 = Id::U8(0);
    //         let token_2 = Id::U8(1);

    //         let amount_1 = 1;
    //         let amount_2 = 20;

    //         assert_eq!(balance_of_37!(client, address, alice, None), 0);

    //         let mint_tx = {
    //             let _msg = build_message::<ContractRef>(address.clone())
    //                 .call(|contract| contract.mint_tokens(token_1.clone(), amount_1));
    //             client
    //                 .call(&ink_e2e::alice(), _msg, 0, None)
    //                 .await
    //                 .expect("mint failed")
    //         }
    //         .return_value();

    //         assert_eq!(mint_tx, Ok(()));

    //         let mint_tx = {
    //             let _msg = build_message::<ContractRef>(address.clone())
    //                 .call(|contract| contract.mint_tokens(token_2.clone(), amount_2));
    //             client
    //                 .call(&ink_e2e::alice(), _msg, 0, None)
    //                 .await
    //                 .expect("mint failed")
    //         }
    //         .return_value();

    //         assert_eq!(mint_tx, Ok(()));

    //         assert_eq!(
    //             balance_of_37!(client, address, alice, Some(token_1.clone())),
    //             amount_1
    //         );
    //         assert_eq!(
    //             balance_of_37!(client, address, alice, Some(token_2.clone())),
    //             amount_2
    //         );
    //         assert_eq!(balance_of_37!(client, address, alice, None), 2);

    //         Ok(())
    //     }

    //     #[ink_e2e::test]
    //     async fn total_supply_works(mut client: ink_e2e::Client<C, E>) -> E2EResult<()> {
    //         let constructor = ContractRef::new();
    //         let address = client
    //             .instantiate("albums", &ink_e2e::alice(), constructor, 0, None)
    //             .await
    //             .expect("instantiate failed")
    //             .account_id;

    //         let token_1 = Id::U8(0);
    //         let token_2 = Id::U8(1);

    //         let amount_1 = 1;
    //         let amount_2 = 20;

    //         let total_supply = {
    //             let _msg = build_message::<ContractRef>(address.clone())
    //                 .call(|contract| contract.total_supply(None));
    //             client.call_dry_run(&ink_e2e::alice(), &_msg, 0, None).await
    //         }
    //         .return_value();

    //         assert_eq!(total_supply, 0);

    //         let mint_tx = {
    //             let _msg = build_message::<ContractRef>(address.clone())
    //                 .call(|contract| contract.mint_tokens(token_1.clone(), amount_1.clone()));
    //             client
    //                 .call(&ink_e2e::alice(), _msg, 0, None)
    //                 .await
    //                 .expect("call failed")
    //         }
    //         .return_value();

    //         assert_eq!(mint_tx, Ok(()));

    //         let total_supply_1 = {
    //             let _msg = build_message::<ContractRef>(address.clone())
    //                 .call(|contract| contract.total_supply(Some(token_1.clone())));
    //             client.call_dry_run(&ink_e2e::alice(), &_msg, 0, None).await
    //         }
    //         .return_value();

    //         assert_eq!(total_supply_1.clone(), amount_1.clone());

    //         let total_supply_2 = {
    //             let _msg = build_message::<ContractRef>(address.clone())
    //                 .call(|contract| contract.total_supply(None));
    //             client.call_dry_run(&ink_e2e::alice(), &_msg, 0, None).await
    //         }
    //         .return_value();

    //         assert_eq!(total_supply_2, 1);

    //         let mint_tx = {
    //             let _msg = build_message::<ContractRef>(address.clone())
    //                 .call(|contract| contract.mint_tokens(token_2.clone(), amount_2.clone()));
    //             client
    //                 .call(&ink_e2e::alice(), _msg, 0, None)
    //                 .await
    //                 .expect("call failed")
    //         }
    //         .return_value();

    //         assert_eq!(mint_tx, Ok(()));

    //         let total_supply_1 = {
    //             let _msg = build_message::<ContractRef>(address.clone())
    //                 .call(|contract| contract.total_supply(Some(token_2.clone())));
    //             client.call_dry_run(&ink_e2e::alice(), &_msg, 0, None).await
    //         }
    //         .return_value();

    //         assert_eq!(total_supply_1.clone(), amount_2.clone());

    //         let total_supply_2 = {
    //             let _msg = build_message::<ContractRef>(address.clone())
    //                 .call(|contract| contract.total_supply(None));
    //             client.call_dry_run(&ink_e2e::alice(), &_msg, 0, None).await
    //         }
    //         .return_value();

    //         assert_eq!(total_supply_2.clone(), 2);

    //         Ok(())
    //     }

    //     #[ink_e2e::test]
    //     async fn allowance_works(mut client: ink_e2e::Client<C, E>) -> E2EResult<()> {
    //         let constructor = ContractRef::new();
    //         let address = client
    //             .instantiate("albums", &ink_e2e::alice(), constructor, 0, None)
    //             .await
    //             .expect("instantiate failed")
    //             .account_id;

    //         let token = Id::U8(0);

    //         let allowance = {
    //             let _msg = build_message::<ContractRef>(address.clone()).call(|contract| {
    //                 contract.allowance(address_of!(alice), address_of!(bob), Some(token.clone()))
    //             });
    //             client.call_dry_run(&ink_e2e::alice(), &_msg, 0, None).await
    //         }
    //         .return_value();

    //         assert_eq!(allowance, 0);

    //         let approve_tx = {
    //             let _msg = build_message::<ContractRef>(address.clone())
    //                 .call(|contract| contract.approve(address_of!(bob), Some(token.clone()), 10));
    //             client
    //                 .call(&ink_e2e::alice(), _msg, 0, None)
    //                 .await
    //                 .expect("approve failed")
    //         }
    //         .return_value();

    //         assert_eq!(approve_tx, Ok(()));

    //         let allowance = {
    //             let _msg = build_message::<ContractRef>(address.clone()).call(|contract| {
    //                 contract.allowance(address_of!(alice), address_of!(bob), Some(token.clone()))
    //             });
    //             client.call_dry_run(&ink_e2e::alice(), &_msg, 0, None).await
    //         }
    //         .return_value();

    //         assert_eq!(allowance, 10);

    //         Ok(())
    //     }

    //     #[ink_e2e::test]
    //     async fn transfer_works(mut client: ink_e2e::Client<C, E>) -> E2EResult<()> {
    //         let constructor = ContractRef::new();
    //         let address = client
    //             .instantiate("albums", &ink_e2e::alice(), constructor, 0, None)
    //             .await
    //             .expect("instantiate failed")
    //             .account_id;

    //         let token_1 = Id::U8(0);
    //         let token_2 = Id::U8(1);

    //         let amount_1 = 1;
    //         let amount_2 = 10;

    //         let mint_tx = {
    //             let _msg = build_message::<ContractRef>(address.clone())
    //                 .call(|contract| contract.mint_tokens(token_1.clone(), amount_1.clone()));
    //             client
    //                 .call(&ink_e2e::alice(), _msg, 0, None)
    //                 .await
    //                 .expect("call failed")
    //         }
    //         .return_value();

    //         assert_eq!(mint_tx, Ok(()));

    //         let mint_tx = {
    //             let _msg = build_message::<ContractRef>(address.clone())
    //                 .call(|contract| contract.mint_tokens(token_2.clone(), amount_2.clone()));
    //             client
    //                 .call(&ink_e2e::alice(), _msg, 0, None)
    //                 .await
    //                 .expect("call failed")
    //         }
    //         .return_value();

    //         assert_eq!(mint_tx, Ok(()));

    //         assert_eq!(balance_of_37!(client, address, alice, None), 2);
    //         assert_eq!(
    //             balance_of_37!(client, address, alice, Some(token_1.clone())),
    //             amount_1
    //         );
    //         assert_eq!(
    //             balance_of_37!(client, address, alice, Some(token_2.clone())),
    //             amount_2
    //         );

    //         let total_supply = {
    //             let _msg = build_message::<ContractRef>(address.clone())
    //                 .call(|contract| contract.total_supply(None));
    //             client.call_dry_run(&ink_e2e::alice(), &_msg, 0, None).await
    //         }
    //         .return_value();

    //         assert_eq!(total_supply, 2);

    //         let transfer_tx = {
    //             let _msg = build_message::<ContractRef>(address.clone()).call(|contract| {
    //                 contract.transfer(address_of!(bob), token_2.clone(), amount_2, vec![])
    //             });
    //             client
    //                 .call(&ink_e2e::alice(), _msg, 0, None)
    //                 .await
    //                 .expect("call failed")
    //         }
    //         .return_value();

    //         assert_eq!(transfer_tx, Ok(()));

    //         assert_eq!(
    //             balance_of_37!(client, address, alice, Some(token_1.clone())),
    //             amount_1
    //         );
    //         assert_eq!(
    //             balance_of_37!(client, address, alice, Some(token_2.clone())),
    //             0
    //         );
    //         assert_eq!(
    //             balance_of_37!(client, address, bob, Some(token_1.clone())),
    //             0
    //         );
    //         assert_eq!(
    //             balance_of_37!(client, address, bob, Some(token_2.clone())),
    //             amount_2
    //         );
    //         assert_eq!(balance_of_37!(client, address, alice, None), 1);
    //         assert_eq!(balance_of_37!(client, address, bob, None), 1);

    //         let transfer_tx = {
    //             let _msg = build_message::<ContractRef>(address.clone()).call(|contract| {
    //                 contract.transfer(address_of!(bob), token_1.clone(), amount_1, vec![])
    //             });
    //             client
    //                 .call(&ink_e2e::alice(), _msg, 0, None)
    //                 .await
    //                 .expect("call failed")
    //         }
    //         .return_value();

    //         assert_eq!(transfer_tx, Ok(()));

    //         let transfer_tx = {
    //             let _msg = build_message::<ContractRef>(address.clone()).call(|contract| {
    //                 contract.transfer(address_of!(alice), token_2.clone(), amount_1, vec![])
    //             });
    //             client
    //                 .call(&ink_e2e::bob(), _msg, 0, None)
    //                 .await
    //                 .expect("call failed")
    //         }
    //         .return_value();

    //         assert_eq!(transfer_tx, Ok(()));

    //         assert_eq!(
    //             balance_of_37!(client, address, alice, Some(token_1.clone())),
    //             0
    //         );
    //         assert_eq!(
    //             balance_of_37!(client, address, alice, Some(token_2.clone())),
    //             amount_1
    //         );
    //         assert_eq!(
    //             balance_of_37!(client, address, bob, Some(token_1.clone())),
    //             amount_1
    //         );
    //         assert_eq!(
    //             balance_of_37!(client, address, bob, Some(token_2.clone())),
    //             amount_2 - amount_1
    //         );
    //         assert_eq!(balance_of_37!(client, address, alice, None), 1);
    //         assert_eq!(balance_of_37!(client, address, bob, None), 2);

    //         Ok(())
    //     }

    //     #[ink_e2e::test]
    //     async fn transfer_from_works(mut client: ink_e2e::Client<C, E>) -> E2EResult<()> {
    //         let constructor = ContractRef::new();
    //         let address = client
    //             .instantiate("albums", &ink_e2e::alice(), constructor, 0, None)
    //             .await
    //             .expect("instantiate failed")
    //             .account_id;

    //         let token_1 = Id::U8(0);
    //         let token_2 = Id::U8(1);

    //         let amount_1 = 1;
    //         let amount_2 = 10;

    //         let mint_tx = {
    //             let _msg = build_message::<ContractRef>(address.clone())
    //                 .call(|contract| contract.mint_tokens(token_1.clone(), amount_1.clone()));
    //             client
    //                 .call(&ink_e2e::alice(), _msg, 0, None)
    //                 .await
    //                 .expect("call failed")
    //         }
    //         .return_value();

    //         assert_eq!(mint_tx, Ok(()));

    //         let mint_tx = {
    //             let _msg = build_message::<ContractRef>(address.clone())
    //                 .call(|contract| contract.mint_tokens(token_2.clone(), amount_2.clone()));
    //             client
    //                 .call(&ink_e2e::alice(), _msg, 0, None)
    //                 .await
    //                 .expect("call failed")
    //         }
    //         .return_value();

    //         assert_eq!(mint_tx, Ok(()));

    //         let approve_tx = {
    //             let _msg = build_message::<ContractRef>(address.clone())
    //                 .call(|contract| contract.approve(address_of!(alice), None, 1));
    //             client
    //                 .call(&ink_e2e::bob(), _msg, 0, None)
    //                 .await
    //                 .expect("call failed")
    //         }
    //         .return_value();

    //         assert_eq!(approve_tx, Ok(()));

    //         let transfer_from_tx = {
    //             let _msg = build_message::<ContractRef>(address.clone()).call(|contract| {
    //                 contract.transfer_from(
    //                     address_of!(alice),
    //                     address_of!(bob),
    //                     token_2.clone(),
    //                     amount_2,
    //                     vec![],
    //                 )
    //             });
    //             client
    //                 .call(&ink_e2e::alice(), _msg, 0, None)
    //                 .await
    //                 .expect("call failed")
    //         }
    //         .return_value();

    //         assert_eq!(transfer_from_tx, Ok(()));

    //         assert_eq!(
    //             balance_of_37!(client, address, alice, Some(token_1.clone())),
    //             amount_1
    //         );
    //         assert_eq!(
    //             balance_of_37!(client, address, alice, Some(token_2.clone())),
    //             0
    //         );
    //         assert_eq!(
    //             balance_of_37!(client, address, bob, Some(token_1.clone())),
    //             0
    //         );
    //         assert_eq!(
    //             balance_of_37!(client, address, bob, Some(token_2.clone())),
    //             amount_2
    //         );

    //         let transfer_from_tx = {
    //             let _msg = build_message::<ContractRef>(address.clone()).call(|contract| {
    //                 contract.transfer_from(
    //                     address_of!(alice),
    //                     address_of!(bob),
    //                     token_1.clone(),
    //                     amount_1,
    //                     vec![],
    //                 )
    //             });
    //             client
    //                 .call(&ink_e2e::alice(), _msg, 0, None)
    //                 .await
    //                 .expect("call failed")
    //         }
    //         .return_value();

    //         assert_eq!(transfer_from_tx, Ok(()));

    //         let transfer_from_tx = {
    //             let _msg = build_message::<ContractRef>(address.clone()).call(|contract| {
    //                 contract.transfer_from(
    //                     address_of!(bob),
    //                     address_of!(alice),
    //                     token_2.clone(),
    //                     amount_1,
    //                     vec![],
    //                 )
    //             });
    //             client
    //                 .call(&ink_e2e::alice(), _msg, 0, None)
    //                 .await
    //                 .expect("call failed")
    //         }
    //         .return_value();

    //         assert_eq!(transfer_from_tx, Ok(()));

    //         assert_eq!(
    //             balance_of_37!(client, address, alice, Some(token_1.clone())),
    //             0
    //         );
    //         assert_eq!(
    //             balance_of_37!(client, address, alice, Some(token_2.clone())),
    //             amount_1
    //         );
    //         assert_eq!(
    //             balance_of_37!(client, address, bob, Some(token_1.clone())),
    //             amount_1
    //         );
    //         assert_eq!(
    //             balance_of_37!(client, address, bob, Some(token_2.clone())),
    //             amount_2 - amount_1
    //         );

    //         Ok(())
    //     }

    //     #[ink_e2e::test]
    //     async fn transfer_from_insufficient_balance_should_fail(
    //         mut client: ink_e2e::Client<C, E>,
    //     ) -> E2EResult<()> {
    //         let constructor = ContractRef::new();
    //         let address = client
    //             .instantiate("albums", &ink_e2e::alice(), constructor, 0, None)
    //             .await
    //             .expect("instantiate failed")
    //             .account_id;

    //         let token = Id::U8(0);
    //         let amount = 1;

    //         let mint_tx = {
    //             let _msg = build_message::<ContractRef>(address.clone())
    //                 .call(|contract| contract.mint_tokens(token.clone(), amount.clone()));
    //             client
    //                 .call(&ink_e2e::alice(), _msg, 0, None)
    //                 .await
    //                 .expect("call failed")
    //         }
    //         .return_value();

    //         assert_eq!(mint_tx, Ok(()));

    //         assert_eq!(
    //             balance_of_37!(client, address, alice, Some(token.clone())),
    //             amount
    //         );

    //         let approve_tx = {
    //             let _msg = build_message::<ContractRef>(address.clone()).call(|contract| {
    //                 contract.approve(address_of!(alice), Some(token.clone()), amount)
    //             });
    //             client
    //                 .call(&ink_e2e::bob(), _msg, 0, None)
    //                 .await
    //                 .expect("call failed")
    //         }
    //         .return_value();

    //         assert_eq!(approve_tx, Ok(()));

    //         let transfer_from_tx = {
    //             let _msg = build_message::<ContractRef>(address.clone()).call(|contract| {
    //                 contract.transfer_from(
    //                     address_of!(bob),
    //                     address_of!(alice),
    //                     token.clone(),
    //                     amount + 1,
    //                     vec![],
    //                 )
    //             });
    //             client.call_dry_run(&ink_e2e::bob(), &_msg, 0, None).await
    //         }
    //         .return_value();

    //         assert!(matches!(transfer_from_tx, Err(_)));

    //         assert_eq!(
    //             balance_of_37!(client, address, alice, Some(token.clone())),
    //             amount
    //         );

    //         Ok(())
    //     }

    //     #[ink_e2e::test]
    //     async fn transfer_from_without_allowance_should_fail(
    //         mut client: ink_e2e::Client<C, E>,
    //     ) -> E2EResult<()> {
    //         let constructor = ContractRef::new();
    //         let address = client
    //             .instantiate("albums", &ink_e2e::alice(), constructor, 0, None)
    //             .await
    //             .expect("instantiate failed")
    //             .account_id;

    //         let token = Id::U8(0);
    //         let amount = 1;

    //         let mint_tx = {
    //             let _msg = build_message::<ContractRef>(address.clone())
    //                 .call(|contract| contract.mint_tokens(token.clone(), amount.clone()));
    //             client
    //                 .call(&ink_e2e::alice(), _msg, 0, None)
    //                 .await
    //                 .expect("call failed")
    //         }
    //         .return_value();

    //         assert_eq!(mint_tx, Ok(()));

    //         assert_eq!(
    //             balance_of_37!(client, address, alice, Some(token.clone())),
    //             amount
    //         );

    //         let transfer_from_tx = {
    //             let _msg = build_message::<ContractRef>(address.clone()).call(|contract| {
    //                 contract.transfer_from(
    //                     address_of!(bob),
    //                     address_of!(alice),
    //                     token.clone(),
    //                     amount + 1,
    //                     vec![],
    //                 )
    //             });
    //             client.call_dry_run(&ink_e2e::bob(), &_msg, 0, None).await
    //         }
    //         .return_value();

    //         assert!(matches!(transfer_from_tx, Err(_)));

    //         assert_eq!(
    //             balance_of_37!(client, address, alice, Some(token.clone())),
    //             amount
    //         );

    //         Ok(())
    //     }
    // }
}
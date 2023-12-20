#![cfg_attr(not(feature = "std"), no_std, no_main)]

//! Album smart contract prototype for Allfeat

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
#[openbrush::implementation(Ownable)]
#[allfeat_contracts::implementation(AFT37, AFT37URIStorage, AFT37PayableMint)]
#[allfeat_contracts::contract]
pub mod albums {
    use allfeat_contracts::aft37::{
        self,
        extensions::{
            payable_mint::{self, AFT37PayableMintImpl},
            uri_storage::URI,
        },
        AFT37Error,
    };
    use ink::{prelude::vec, storage::Mapping};
    use openbrush::{contracts::ownable::OwnableError, traits::Storage};
    use scale::{Decode, Encode};

    /// Event emitted when an artist creates a song or an album.
    #[ink(event)]
    pub struct ItemCreated {
        /// The artist.
        from: AccountId,
        /// Album id.
        album_id: AlbumId,
        /// Song id.
        song_id: SongId,
        /// Max supply of the creation.
        max_supply: u32,
        /// The URI of the creation.
        uri: URI,
        /// The price of the creation.
        price: Balance,
    }

    /// Event emitted when an artist deletes an album or a song.
    #[ink(event)]
    pub struct ItemDeleted {
        /// Album id.
        album_id: AlbumId,
        /// Song id.
        song_id: SongId,
    }

    /// Event emitted when a user mints a creation (song or album).
    #[ink(event)]
    pub struct ItemMinted {
        /// The artist.
        from: AccountId,
        /// The fan.
        to: AccountId,
        /// Album id.
        album_id: AlbumId,
        /// Song id.
        song_id: SongId,
        /// The price of the mint.
        price: Balance,
    }

    /// Event emitted when an artist updates a creation (song or album).
    #[ink(event)]
    pub struct ItemUpdated {
        /// The artist.
        from: AccountId,
        /// Album id.
        album_id: AlbumId,
        /// Song id.
        song_id: SongId,
        /// The new URI of the creation.
        new_uri: URI,
    }

    /// The main contract structure.
    #[derive(Storage)]
    #[ink(storage)]
    pub struct Contract {
        /// The aft37 data structure, managing the balances, supply, and operator approvals.
        #[storage_field]
        data: aft37::Data,

        /// The payable mint data structure, managing the price and max supply of each token.
        #[storage_field]
        payable_mint: payable_mint::Data,

        /// The ownable data structure, managing the owner of the contract.
        #[storage_field]
        ownable: ownable::Data,

        /// The URI storage data structure, managing the base URI and token URIs.
        #[storage_field]
        uris: uri_storage::Data,

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
    fn _is_album(id: &Id) -> bool {
        // Extract the SongId portion and check if it's 0
        match id {
            Id::U32(id) => (id & 0xFFFF) == 0,
            _ => false,
        }
    }

    /// Errors that can occur during execution of the contract.
    #[derive(Encode, Decode, Debug, PartialEq, Eq)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub enum Error {
        NotOwner,
        InvalidAlbumId,
        InvalidSongId,
        InvalidId,
        DeniedId,
        Internal(AFT37Error),
    }

    impl From<OwnableError> for Error {
        fn from(_: OwnableError) -> Self {
            Error::NotOwner
        }
    }

    impl From<AFT37Error> for Error {
        fn from(e: AFT37Error) -> Self {
            Error::Internal(e)
        }
    }

    impl Contract {
        #[ink(constructor, payable)]
        pub fn new(base_uri: Option<URI>, owner: AccountId) -> Self {
            let mut instance = Self {
                data: aft37::Data::default(),
                denied_ids: Mapping::default(),
                songs: Mapping::default(),
                uris: uri_storage::Data::default(),
                ownable: ownable::Data::default(),
                payable_mint: payable_mint::Data::default(),
                current_album_id: 0,
            };

            uri_storage::Internal::_set_base_uri(&mut instance, base_uri);
            ownable::InternalImpl::_init_with_owner(&mut instance, owner);

            instance
        }

        #[ink(message)]
        #[openbrush::modifiers(only_owner)]
        pub fn set_token_uri(&mut self, token_id: Id, token_uri: URI) -> Result<(), Error> {
            uri_storage::Internal::_set_token_uri(self, token_id.clone(), token_uri.clone())?;

            let (album_id, song_id) = match token_id {
                Id::U32(id) => ((id >> 16) as AlbumId, (id & 0xFFFF) as SongId),
                _ => return Err(Error::InvalidId),
            };

            self.env().emit_event({
                ItemUpdated {
                    from: self.env().caller(),
                    new_uri: token_uri,
                    album_id,
                    song_id,
                }
            });
            Ok(())
        }

        /// Denies an ID from being used.
        #[ink(message)]
        #[openbrush::modifiers(only_owner)]
        pub fn deny(&mut self, album_id: AlbumId, song_id: SongId) -> Result<(), Error> {
            self.denied_ids.insert(&combine_ids(album_id, song_id), &());

            Ok(())
        }

        /// Creates an album.
        #[ink(message)]
        #[openbrush::modifiers(only_owner)]
        pub fn create_album(
            &mut self,
            max_supply: u32,
            price: Balance,
            album_uri: URI,
        ) -> Result<Id, Error> {
            // Insert new album into songs mapping
            self.songs
                .insert(self.current_album_id, &Vec::<SongId>::new());

            let token_id = combine_ids(self.current_album_id, 0);

            self.payable_mint.price_per_mint.insert(&token_id, &price);
            self.payable_mint.max_supply.insert(&token_id, &max_supply);
            self.uris.token_uris.insert(&token_id, &album_uri);

            self.env().emit_event({
                ItemCreated {
                    from: self.env().caller(),
                    album_id: self.current_album_id,
                    uri: album_uri,
                    song_id: 0,
                    max_supply,
                    price,
                }
            });

            // Increment current AlbumId counter
            self.current_album_id += 1;

            Ok(token_id)
        }

        /// Creates a song within an album.
        #[ink(message)]
        #[openbrush::modifiers(only_owner)]
        pub fn create_song(
            &mut self,
            album_id: AlbumId,
            max_supply: u32,
            price: Balance,
            song_uri: URI,
        ) -> Result<Id, Error> {
            let mut album = self.songs.get(album_id).ok_or(Error::InvalidAlbumId)?;
            let song_id = (album.len() + 1) as SongId;
            let token_id = combine_ids(album_id, song_id);

            // Add song into album
            album.push(song_id);
            self.songs.insert(album_id, &album);

            self.payable_mint.price_per_mint.insert(&token_id, &price);
            self.payable_mint.max_supply.insert(&token_id, &max_supply);
            self.uris.token_uris.insert(&token_id, &song_uri);

            self.env().emit_event({
                ItemCreated {
                    from: self.env().caller(),
                    uri: song_uri,
                    album_id,
                    song_id,
                    max_supply,
                    price,
                }
            });

            Ok(token_id)
        }

        /// Deletes an album.
        #[ink(message)]
        #[openbrush::modifiers(only_owner)]
        pub fn delete_album(&mut self, album_id: AlbumId) -> Result<(), Error> {
            self.songs.get(album_id).ok_or(Error::InvalidAlbumId)?;

            // Remove album from songs mapping
            self.songs.remove(album_id);
            self.env().emit_event({
                ItemDeleted {
                    album_id,
                    song_id: 0,
                }
            });

            Ok(())
        }

        /// Deletes a song from an album.
        #[ink(message)]
        #[openbrush::modifiers(only_owner)]
        pub fn delete_song(&mut self, album_id: AlbumId, song_id: SongId) -> Result<(), Error> {
            let mut album = self.songs.get(album_id).ok_or(Error::InvalidAlbumId)?;

            // Remove song from songs mapping
            album.remove(
                album
                    .iter()
                    .position(|s| *s == song_id)
                    .ok_or(Error::InvalidSongId)?,
            );
            self.songs.insert(album_id, &album);
            self.env().emit_event(ItemDeleted { album_id, song_id });

            Ok(())
        }

        /// Mints a new album to the caller.
        #[ink(message, payable)]
        pub fn mint_album(&mut self, album_id: AlbumId) -> Result<Id, Error> {
            let id = combine_ids(album_id, 0);
            let caller = self.env().caller();

            if self.denied_ids.get(&id).is_some() {
                return Err(Error::DeniedId);
            }

            allfeat_contracts::aft37::extensions::payable_mint::AFT37PayableMintImpl::mint(
                self,
                caller,
                vec![(id.clone(), 1)],
            )?;

            self.env().emit_event({
                ItemMinted {
                    from: self.ownable.owner.get().unwrap().unwrap(),
                    to: caller,
                    song_id: 0,
                    album_id,
                    price: self.payable_mint.price_per_mint.get(&id).unwrap(),
                }
            });

            Ok(id)
        }

        /// Mints a new song to the caller.
        #[ink(message, payable)]
        pub fn mint_song(&mut self, album_id: AlbumId, song_id: SongId) -> Result<Id, Error> {
            let id = combine_ids(album_id, song_id);
            let caller = self.env().caller();

            if self.denied_ids.get(&id).is_some() {
                return Err(Error::DeniedId);
            }

            allfeat_contracts::aft37::extensions::payable_mint::AFT37PayableMintImpl::mint(
                self,
                caller,
                vec![(id.clone(), 1)],
            )?;

            self.env().emit_event({
                ItemMinted {
                    from: self.ownable.owner.get().unwrap().unwrap(),
                    to: caller,
                    album_id,
                    song_id,
                    price: self.payable_mint.price_per_mint.get(&id).unwrap(),
                }
            });

            Ok(id)
        }
    }

    #[cfg(test)]
    mod tests {
        use super::*;

        #[ink::test]
        fn new_works() {
            let owner_id = AccountId::from([0x01; 32]);
            let uri = URI::from("ipfs://Qm.../");
            let contract = Contract::new(Some(uri.clone()), owner_id);

            assert_eq!(contract.ownable.owner.get().unwrap(), Some(owner_id));
            assert_eq!(contract.uris.base_uri, Some(uri));
        }

        #[ink::test]
        fn combine_ids_works() {
            let album_id: AlbumId = 21;
            let song_id: SongId = 1;
            let id = combine_ids(album_id, song_id);

            assert_eq!(id, Id::U32(1376257));
        }

        #[ink::test]
        fn _is_album_works() {
            let album_id: AlbumId = 21;
            let song_id: SongId = 1;
            let id = combine_ids(album_id, song_id);

            assert!(!_is_album(&id));

            let album_id: AlbumId = 1;
            let song_id: SongId = 0;
            let id = combine_ids(album_id, song_id);

            assert!(_is_album(&id));
        }
    }

    #[cfg(all(test, feature = "e2e-tests"))]
    mod e2e_tests {
        use super::*;
        use ink_e2e::build_message;

        type E2EResult<T> = std::result::Result<T, Box<dyn std::error::Error>>;

        // This test creates two albums and checks for their ids
        #[ink_e2e::test]
        async fn test_create_album(mut client: ink_e2e::Client<C, E>) -> E2EResult<()> {
            let uri = Some(URI::from("ipfs://Qm.../"));
            let constructor =
                ContractRef::new(uri, ink_e2e::account_id(ink_e2e::AccountKeyring::Alice));
            let contract_acc_id = client
                .instantiate("albums", &ink_e2e::alice(), constructor, 0, None)
                .await
                .expect("instantiate failed")
                .account_id;

            // Creates a first album
            let create_album = build_message::<ContractRef>(contract_acc_id)
                .call(|contract| contract.create_album(10, 1, URI::from("ipfs://Qm.../album1")));
            let create_album_res = client
                .call(&ink_e2e::alice(), create_album, 0, None)
                .await
                .expect("create album failed");

            // Checks for first's album id
            assert_eq!(create_album_res.return_value(), Ok(combine_ids(0, 0)));

            // Creates a second album
            let create_album = build_message::<ContractRef>(contract_acc_id)
                .call(|contract| contract.create_album(10, 1, URI::from("ipfs://Qm.../album2")));
            let create_album_res = client
                .call(&ink_e2e::alice(), create_album, 0, None)
                .await
                .expect("create album failed");

            // Checks for second's album id
            assert_eq!(create_album_res.return_value(), Ok(combine_ids(1, 0)));

            Ok(())
        }

        // This test creates an album, deletes it, and checks it was deleted succeffully
        #[ink_e2e::test]
        async fn test_delete_album(mut client: ink_e2e::Client<C, E>) -> E2EResult<()> {
            Ok(())
        }

        // This test creates an album and tries to mint it.
        #[ink_e2e::test]
        async fn test_mint_album(mut client: ink_e2e::Client<C, E>) -> E2EResult<()> {
            let uri = Some(URI::from("ipfs://Qm.../"));
            let constructor =
                ContractRef::new(uri, ink_e2e::account_id(ink_e2e::AccountKeyring::Alice));
            let contract_acc_id = client
                .instantiate("albums", &ink_e2e::alice(), constructor, 0, None)
                .await
                .expect("instantiate failed")
                .account_id;

            // Creates an album
            let create_album = build_message::<ContractRef>(contract_acc_id)
                .call(|contract| contract.create_album(10, 1, URI::from("ipfs://Qm.../album1")));
            let create_album_res = client
                .call(&ink_e2e::alice(), create_album, 0, None)
                .await
                .expect("create album failed");

            // Checks for new album id
            assert_eq!(create_album_res.return_value(), Ok(combine_ids(0, 0)));

            // Mints the newly created album
            let mint_album = build_message::<ContractRef>(contract_acc_id)
                .call(|contract| contract.mint_album(0));
            let mint_album_res = client
                .call(&ink_e2e::alice(), mint_album, 1, None)
                .await
                .expect("mint album failed");

            // Checks it was minted successfully
            assert_eq!(mint_album_res.return_value(), Ok(combine_ids(0, 0)));

            Ok(())
        }

        // This test creates an album including two songs and checks for their ids
        #[ink_e2e::test]
        async fn test_create_song(mut client: ink_e2e::Client<C, E>) -> E2EResult<()> {
            let uri = Some(URI::from("ipfs://Qm.../"));
            let constructor =
                ContractRef::new(uri, ink_e2e::account_id(ink_e2e::AccountKeyring::Alice));
            let contract_acc_id = client
                .instantiate("albums", &ink_e2e::alice(), constructor, 0, None)
                .await
                .expect("instantiate failed")
                .account_id;

            // Creates a first album
            let create_album = build_message::<ContractRef>(contract_acc_id)
                .call(|contract| contract.create_album(10, 1, URI::from("ipfs://Qm.../album1")));
            let create_album_res = client
                .call(&ink_e2e::alice(), create_album, 0, None)
                .await
                .expect("create album failed");

            // Checks for first's album id
            assert_eq!(create_album_res.return_value(), Ok(combine_ids(0, 0)));

            // Creates a first song within the album
            let create_song = build_message::<ContractRef>(contract_acc_id)
                .call(|contract| contract.create_song(0, 10, 1, URI::from("ipfs://Qm.../song1")));
            let create_song_res = client
                .call(&ink_e2e::alice(), create_song, 0, None)
                .await
                .expect("create song failed");

            // Checks for first's song id
            assert_eq!(create_song_res.return_value(), Ok(combine_ids(0, 1)));

            // Creates a second song within the album
            let create_song = build_message::<ContractRef>(contract_acc_id)
                .call(|contract| contract.create_song(0, 10, 1, URI::from("ipfs://Qm.../song2")));
            let create_song_res = client
                .call(&ink_e2e::alice(), create_song, 0, None)
                .await
                .expect("create song failed");

            // Checks for second's song id
            assert_eq!(create_song_res.return_value(), Ok(combine_ids(0, 2)));

            Ok(())
        }

        // This test creates an album including a song, deletes it, and checks it was deleted succeffully
        #[ink_e2e::test]
        async fn test_delete_song(mut client: ink_e2e::Client<C, E>) -> E2EResult<()> {
            Ok(())
        }

        // This test creates an album including a song and tries to mint it.
        #[ink_e2e::test]
        async fn test_mint_song(mut client: ink_e2e::Client<C, E>) -> E2EResult<()> {
            let uri = Some(URI::from("ipfs://Qm.../"));
            let constructor =
                ContractRef::new(uri, ink_e2e::account_id(ink_e2e::AccountKeyring::Alice));
            let contract_acc_id = client
                .instantiate("albums", &ink_e2e::alice(), constructor, 0, None)
                .await
                .expect("instantiate failed")
                .account_id;

            // Creates an album
            let create_album = build_message::<ContractRef>(contract_acc_id)
                .call(|contract| contract.create_album(10, 1, URI::from("ipfs://Qm.../album1")));
            let create_album_res = client
                .call(&ink_e2e::alice(), create_album, 0, None)
                .await
                .expect("create album failed");

            // Checks for new album id
            assert_eq!(create_album_res.return_value(), Ok(combine_ids(0, 0)));

            // Creates a song within the album
            let create_song = build_message::<ContractRef>(contract_acc_id)
                .call(|contract| contract.create_song(0, 10, 1, URI::from("ipfs://Qm.../song1")));
            let create_song_res = client
                .call(&ink_e2e::alice(), create_song, 0, None)
                .await
                .expect("create song failed");

            // Checks for new song id
            assert_eq!(create_song_res.return_value(), Ok(combine_ids(0, 1)));

            // Mints the newly created song
            let mint_song = build_message::<ContractRef>(contract_acc_id)
                .call(|contract| contract.mint_song(0, 1));
            let mint_song_res = client
                .call(&ink_e2e::alice(), mint_song, 1, None)
                .await
                .expect("mint song failed");

            // Checks it was minted successfully
            assert_eq!(mint_song_res.return_value(), Ok(combine_ids(0, 1)));

            Ok(())
        }

        // TODO: find a way to test error on e2e tests
        // // This test creates an album, denies its id and tries to mint it.
        // #[ink_e2e::test]
        // async fn test_deny_id(mut client: ink_e2e::Client<C, E>) -> E2EResult<()> {
        //     let uri = Some(URI::from("ipfs://Qm.../"));
        //     let constructor =
        //         ContractRef::new(uri, ink_e2e::account_id(ink_e2e::AccountKeyring::Alice));
        //     let contract_acc_id = client
        //         .instantiate("albums", &ink_e2e::alice(), constructor, 0, None)
        //         .await
        //         .expect("instantiate failed")
        //         .account_id;

        //     // Creates an album
        //     let create_album = build_message::<ContractRef>(contract_acc_id)
        //         .call(|contract| contract.create_album(10, 1, URI::from("ipfs://Qm.../album1")));
        //     let create_album_res = client
        //         .call(&ink_e2e::alice(), create_album, 0, None)
        //         .await
        //         .expect("create album failed");

        //     // Checks for new album id
        //     assert_eq!(create_album_res.return_value(), Ok(combine_ids(0, 0)));

        //     // Deny the album's id
        //     let deny =
        //         build_message::<ContractRef>(contract_acc_id).call(|contract| contract.deny(0, 0));
        //     let deny_res = client
        //         .call(&ink_e2e::alice(), deny, 0, None)
        //         .await
        //         .expect("create album failed");

        //     // Check it was denied
        //     assert_eq!(deny_res.return_value(), Ok(()));

        //     // Mints the newly created album
        //     let mint_album = build_message::<ContractRef>(contract_acc_id)
        //         .call(|contract| contract.mint_album(0));
        //     let mint_album_res = client.call(&ink_e2e::alice(), mint_album, 1, None).await;

        //     // Checks it could not be minted
        //     assert_eq!(mint_album_res, Err(Error::DeniedId));

        //     Ok(())
        // }
    }
}

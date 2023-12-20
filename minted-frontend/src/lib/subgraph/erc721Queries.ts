import { gql } from 'graphql-request';

export const QUERY_ERC721_NOTOWNED_ID = (from: number, count: number, owner: string) => gql`
  query getUserActiveOrders {
    tokens(
      orderBy: numericId,
      skip: ${from},
      first: ${count},
      where: {owner_not: "${owner.toLowerCase()}"}
    ) {
      id
      numericId
      uri
    }
  }
`;

export const QUERY_GET_ADMIN_TRANSFERS = () => gql`
  query getTransfers {
    transfers(where: { role_eq: "Admin" }) {
      contract
      to
      timestamp
    }
  }
`;

export const QUERY_GET_SUPER_ADMIN_TRANSFERS = () => gql`
  query getTransfers {
    transfers(where: { role_eq: "SuperAdmin" }) {
      to
      timestamp
    }
  }
`;

export const QUERY_GET_ALL_ALBUMS = () => gql`
  query getCollections {
    collections(where: { songid_eq: 0 }) {
      albumid
      block
      contract
      extrinsicHash
      from
      id
      maxsupply
      price
      timestamp
      to
      uri
    }
  }
`;

export const QUERY_GET_OWNED_ALBUMS = (from: string) => gql`
  query getCollections {
    collections(where: {from_eq: "${from}", songid_eq: 0}) {
      albumid
      block
      contract
      extrinsicHash
      from
      id
      maxsupply
      price
      timestamp
      to
      uri
    }
  }
`;

export const QUERY_GET_MINTED_ALBUMS = (to: string) => gql`
  query getMintItems {
    mintItems(where: {to_eq: "${to}", songid_eq: 0}) {
      albumid
      block
      contract
      extrinsicHash
      from
      id
      maxsupply
      price
      timestamp
      to
      uri
    }
  }
`;

export const QUERY_GET_MINTED_SONG = (to: string) => gql`
  query getMintItems {
    mintItems(where: {to_eq: "${to}", songid_gt: 0}) {
      albumid
      songid
      block
      contract
      extrinsicHash
      from
      id
      maxsupply
      price
      timestamp
      to
      uri
    }
  }
`;

export const QUERY_GET_ALBUM_BY_ID = (from: string, albumId: number) => gql`
  query getCollections {
    collections(where: {from_eq: "${from}", albumid_eq: ${albumId}}) {
      albumid
      block
      contract
      extrinsicHash
      from
      id
      maxsupply
      price
      timestamp
      to
      uri
    }
  }
`;

export const QUERY_GET_ALBUM_SONGS = (from: string, albumId: number) => gql`
  query getCollections {
    collections(where: {from_eq: "${from}", albumid_eq: ${albumId}, songid_gt: 0}) {
      albumid
      block
      contract
      extrinsicHash
      from
      id
      maxsupply
      price
      songid
      timestamp
      to
      uri
    }
  }
`;

export const QUERY_GET_SONG_BY_ID = (from: string, albumId: number, songId: number) => gql`
  query getCollections {
    collections(where: {from_eq: "${from}", albumid_eq: ${albumId}, songid_eq: ${songId}}) {
      albumid
      block
      contract
      extrinsicHash
      from
      id
      maxsupply
      price
      songid
      timestamp
      to
      uri
    }
  }
`;

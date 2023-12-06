import { gql } from "graphql-request";

export const QUERY_ERC721_NOTOWNED_ID = (
  from: number,
  count: number,
  owner: string
) => gql`
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
    transfers(where: {role_eq: "Admin"}) {
      contract
      to
      timestamp
    }
  }
`;

export const QUERY_GET_SUPER_ADMIN_TRANSFERS = () => gql`
  query getTransfers {
    transfers(where: {role_eq: "SuperAdmin"}) {
      to
      timestamp
    }
  }
`;

export const QUERY_GET_ALL_ALBUMS = () => gql`
  query getCollections {
    collections(where: {songid_eq: 0}) {
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

export const QUERY_GET_ALBUM_TRANSFERS = (from: string) => gql`
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

export const QUERY_GET_ALBUM_SONGS = (albumId: string) => gql`
  query getCollections {
    collections(where: {songid_gt: 0, albumid_eq: ${albumId}}) {
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

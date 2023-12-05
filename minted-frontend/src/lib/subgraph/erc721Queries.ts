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

export const QUERY_GET_ALBUM_TRANSFERS = (from: string) => gql`
  query getCollections {
    collections(where: {from_eq: "${from}"}) {
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

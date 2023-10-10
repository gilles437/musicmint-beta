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

export const QUERY_GET_TRANSFERS = () => gql`
  query getTransfers {
    transfers {
      id
    }
  }
`;

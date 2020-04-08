/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getChatroom = /* GraphQL */ `
  query GetChatroom($id: ID!) {
    getChatroom(id: $id) {
      id
      name
      description
    }
  }
`;
export const listChatrooms = /* GraphQL */ `
  query ListChatrooms(
    $filter: ModelchatroomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChatrooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
      }
      nextToken
    }
  }
`;

/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createChatroom = /* GraphQL */ `
  mutation CreateChatroom(
    $input: CreateChatroomInput!
    $condition: ModelchatroomConditionInput
  ) {
    createChatroom(input: $input, condition: $condition) {
      id
      name
      description
      owner
    }
  }
`;
export const updateChatroom = /* GraphQL */ `
  mutation UpdateChatroom(
    $input: UpdateChatroomInput!
    $condition: ModelchatroomConditionInput
  ) {
    updateChatroom(input: $input, condition: $condition) {
      id
      name
      description
      owner
    }
  }
`;
export const deleteChatroom = /* GraphQL */ `
  mutation DeleteChatroom(
    $input: DeleteChatroomInput!
    $condition: ModelchatroomConditionInput
  ) {
    deleteChatroom(input: $input, condition: $condition) {
      id
      name
      description
      owner
    }
  }
`;

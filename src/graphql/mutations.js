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
      messages {
        items {
          id
          roomId
          message
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
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
      messages {
        items {
          id
          roomId
          message
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
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
      messages {
        items {
          id
          roomId
          message
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createMessage = /* GraphQL */ `
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelmessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
      id
      roomId
      message
      owner
      createdAt
      updatedAt
    }
  }
`;
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage(
    $input: UpdateMessageInput!
    $condition: ModelmessageConditionInput
  ) {
    updateMessage(input: $input, condition: $condition) {
      id
      roomId
      message
      owner
      createdAt
      updatedAt
    }
  }
`;
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage(
    $input: DeleteMessageInput!
    $condition: ModelmessageConditionInput
  ) {
    deleteMessage(input: $input, condition: $condition) {
      id
      roomId
      message
      owner
      createdAt
      updatedAt
    }
  }
`;

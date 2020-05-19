/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateChatroom = /* GraphQL */ `
  subscription OnCreateChatroom {
    onCreateChatroom {
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
        }
        nextToken
      }
    }
  }
`;
export const onUpdateChatroom = /* GraphQL */ `
  subscription OnUpdateChatroom {
    onUpdateChatroom {
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
        }
        nextToken
      }
    }
  }
`;
export const onDeleteChatroom = /* GraphQL */ `
  subscription OnDeleteChatroom {
    onDeleteChatroom {
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
        }
        nextToken
      }
    }
  }
`;
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage {
    onCreateMessage {
      id
      roomId
      message
      owner
    }
  }
`;
export const onCreateMessageByRoomId = /* GraphQL */ `
  subscription OnCreateMessageByRoomId($roomId: String!) {
    onCreateMessageByRoomID(roomId: $roomId) {
      id
      roomId
      message
      owner
    }
  }
`;
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage {
    onUpdateMessage {
      id
      roomId
      message
      owner
    }
  }
`;
export const onUpdateMessageByRoomId = /* GraphQL */ `
  subscription OnUpdateMessageByRoomId($roomId: String!) {
    onUpdateMessageByRoomID(roomId: $roomId) {
      id
      roomId
      message
      owner
    }
  }
`;
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage {
    onDeleteMessage {
      id
      roomId
      message
      owner
    }
  }
`;
export const onDeleteMessageByRoomId = /* GraphQL */ `
  subscription OnDeleteMessageByRoomId($roomId: String!) {
    onDeleteMessageByRoomID(roomId: $roomId) {
      id
      roomId
      message
      owner
    }
  }
`;

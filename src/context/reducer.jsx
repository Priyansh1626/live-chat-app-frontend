export const initialState = {
  user: null,
  selectedChat: null,
  chats: [],
  notification: [],
};

export const getSender = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};

export const getSenderFull = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};

export const isSameSender = (messages, m, i, userId) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender._id !== m.sender._id ||
      messages[i + 1].sender._id === undefined) &&
    messages[i].sender._id !== userId
  );
};

export const isLastMessage = (messages, i, userId) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};

export const isSameSenderMargin = (messages, m, i, userId) => {
  // console.log(i === messages.length - 1);

  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id &&
    messages[i].sender._id !== userId
  )
    return 33;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  )
    return 0;
  else return "auto";
};

export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    case "SET_SELECTED_CHAT": {
      return {
        ...state,
        selectedChat: action.selectedChat,
      };
    }

    case "SET_CHATS": {
      return {
        ...state,
        chats: action.chats,
      };
    }

    case "SET_CHATS_Front": {
      return {
        chats: action.chats,
        ...state,
      };
    }

    case "SET_NOTIFICATION": {
      return {
        notification: action.notification,
        ...state,
      };
    }

    case "FILTER_NOTIFICATION": {
      not = action.noti;
      notification.filter((n) => n !== not);
      return {
        ...state,
        notification: notification,
      };
    }

    default:
      return state;
  }
};

export default reducer;

export const initialState = {
  user: null,
  selectedChat: null,
  chats: [],
};

export const getSender = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
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

    default:
      return state;
  }
};

export default reducer;

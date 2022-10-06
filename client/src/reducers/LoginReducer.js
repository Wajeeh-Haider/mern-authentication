const initialState = {
  loading: false,
  userInfo: null,
  error: null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST": {
      return {
        loading: true,
      };
    }
    case "LOGIN_SUCCESS": {
      return {
        loading: false,
        userInfo: action.payload,
      };
    }
    case "LOGIN_FAIL": {
      return {
        loading: false,
        error: action.payload,
      };
    }
    case "RESET_LOGIN": {
      return {
        ...initialState,
      };
    }

    default:
      return state;
  }
};

export default loginReducer;

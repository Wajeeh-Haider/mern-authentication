const initialState = {
  loading: false,
};

const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGNUP_REQUEST": {
      return {
        loading: true,
      };
    }
    case "SIGNUP_SUCCESS": {
      return {
        loading: false,
        userRegInfo: action.payload,
      };
    }
    case "SIGNUP_FAIL": {
      return {
        loading: false,
        error: action.payload,
      };
    }

    default:
      return state;
  }
};

export default signupReducer;

const initialState = {
  loading: false,
  error: null,
};

const logoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGOUT_REQUEST": {
      return {
        loading: true,
      };
    }
    case "LOGOUT_SUCCESS": {
 
      return {
        loading: false,
      };
    }
    case "LOGOUT_FAIL": {
      return {
        loading: false,
        error: action.payload,
      };
    }

    default:
      return state;
  }
};

export default logoutReducer;

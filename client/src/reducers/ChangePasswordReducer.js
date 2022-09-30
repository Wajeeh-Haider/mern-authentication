const initialState = {
  loading: false,
  error: null,
  data: null,
};

const ChangePasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_PASSWORD_REQUEST":
      return {
        loading: true,
      };
    case "CHANGE_PASSWORD_SUCCESS":
      return {
        loading: false,
        data: action.payload,
      };
    case "CHANGE_PASSWORD_FAILURE":
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

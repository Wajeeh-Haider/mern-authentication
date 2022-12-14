const initialState = {
  loading: false,
  myData: null,
  error: null,
};
const refreshTokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_INFO_REQUEST_REFRESH":
      return {
        loading: true,
      };
    case "GET_INFO_REFRESH_TOKEN":
      return {
        loading: false,
        myData: action.payload,
      };
    case "REFRESH_TOKEN_REQUEST_FAILED":
      return {
        loading: false,
        error: action.payload,
        myData: null,
      };
    case "RESET_REFRESH_TOKEN_INFO":
       return {
         ...initialState,
       };

    default:
      return state;
  }
};

export default refreshTokenReducer;

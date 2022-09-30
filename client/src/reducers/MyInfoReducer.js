const initialState = {
  loading: false,
  myData: null,
  error: null,
};

const myInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_INFO_REQUEST":
      return {
        loading: true,
      };
    case "GET_INFO_SUCCESSFULL":
      return {
        loading: false,
        myData: action.payload,
      };
    case "GET_INFO_REQUEST_FAILED":
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default myInfoReducer;

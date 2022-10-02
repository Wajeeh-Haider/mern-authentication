const initialState = {
  loading: false,
  myData: null,
  error: null,
};

const myInfoReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case "GET_INFO_REQUEST":
      return {
        loading: true,
        error: null,
      };
    case "GET_INFO_SUCCESSFULL":
      return {
        loading: false,
        myData: action.payload,
        error: null,
      };
    case "GET_INFO_REQUEST_FAILED":
      return {
        loading: false,
        error: action.payload,
        myData: null,
      };

    default:
      return state;
  }
};

export default myInfoReducer;

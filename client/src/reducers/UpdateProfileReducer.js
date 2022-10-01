const intitalState = {
  loading: false,
  updateData: null,
  error: null,
};

const updateProfileReducer = (state = intitalState, action) => {
  switch (action.type) {
    case "UPDATE_PROFILE_REQUEST":
      return {
        loading: true,
      };
    case " UPDATE_PROFILE_SUCCESS":
      return {
        loading: false,
        updateData: action.payload,
      };
    case "UPDATE_PROFILE_REQUEST_FAILED":
      return {
        loading: false,
        error: action.payload,
        updateData: null,
      };
    default:
      return state;
  }
};

export default updateProfileReducer;

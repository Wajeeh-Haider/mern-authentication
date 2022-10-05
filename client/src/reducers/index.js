import { combineReducers } from "redux";

import authReducer from "./authReducer";
import logoutReducer from "./LogoutReducer";
import signupReducer from "./SignupReducer";
import loginReducer from "./LoginReducer";
import getMyInfoReducer from "./MyInfoReducer";
import refreshTokenReducer from "./TokenReducers";
import changePasswordRed from "./ChangePasswordReducer";
import updateProfileReducer from "./UpdateProfileReducer";

const combineAllReducers = combineReducers({
  authReducer,
  logoutReducer,
  signupReducer,
  loginReducer,
  getMyInfoReducer,
  refreshTokenReducer,
  changePasswordRed,
  updateProfileReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT" || action.type === "LOGOUT_SUCCESS") {
    state = undefined;
  }
  return combineAllReducers(state, action);
};

export default rootReducer;

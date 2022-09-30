import { combineReducers } from "redux";

import authReducer from "./authReducer";
import logoutReducer from "./LogoutReducer";
import signupReducer from "./SignupReducer";
import loginReducer from "./LoginReducer";
import myInfoReducer from "./MyInfoReducer";
import refreshTokenReducer from "./TokenReducers";

const rootReducer = combineReducers({
  authReducer,
  logoutReducer,
  signupReducer,
  loginReducer,
  myInfoReducer,
  refreshTokenReducer,
});

export default rootReducer;

import authReducer from "./authReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  authReducer,
});

export default rootReducer;

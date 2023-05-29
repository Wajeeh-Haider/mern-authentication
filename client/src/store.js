import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { loadState } from "./utils/StatePersistors";

const middleware = [thunk];

const store = createStore(
  rootReducer,
  loadState(),
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

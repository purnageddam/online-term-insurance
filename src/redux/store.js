import { combineReducers } from "redux";
import { applyMiddleware } from "redux";
import { createStore } from "redux";
import thunk from "redux-thunk";
import { PolicyReducer } from "./PolicyReducer";

const rootReducer = combineReducers({
  policy: PolicyReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));
export { store };

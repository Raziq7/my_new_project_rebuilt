import { createStore, combineReducers, applyMiddleware } from "redux";
import {
  staffLoginReducer,
  staffRegsterReducer,
} from "./reducers/staffReducer";
import thunk from "redux-thunk";
const appReducer = combineReducers({
  staffData: staffRegsterReducer,
  staffLginData: staffLoginReducer,
});

let Middleware = [thunk];

const store = createStore(appReducer, applyMiddleware(...Middleware));
export default store;

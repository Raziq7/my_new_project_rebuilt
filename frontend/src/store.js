import { createStore, combineReducers, applyMiddleware } from "redux";
import {
  staffLoginReducer,
  staffRegsterReducer,
} from "./reducers/staffReducer";
import {
  addProductReducer,
  deleteProReducer,
  getProductReducer,
} from "./reducers/sAdminReducer";
import thunk from "redux-thunk";
const appReducer = combineReducers({
  staffData: staffRegsterReducer,
  staffLginData: staffLoginReducer,
  productDetails: addProductReducer,
  showProInfo: getProductReducer,
  deleteInfo: deleteProReducer,
});

let Middleware = [thunk];

const store = createStore(appReducer, applyMiddleware(...Middleware));
export default store;

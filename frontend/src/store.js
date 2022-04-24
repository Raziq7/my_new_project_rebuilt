import { createStore, combineReducers, applyMiddleware, compose } from "redux";
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

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let Middleware = [thunk];

const store = createStore(
  appReducer,
  composeEnhancers(applyMiddleware(...Middleware))
);
export default store;

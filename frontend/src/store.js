import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import {
  staffLoginReducer,
  staffRegsterReducer,
  staffShowingReducer,
  staffStatusChangeReducer,
} from "./reducers/staffReducer";
import {
  addProductReducer,
  deleteProReducer,
  getProductReducer,
  editProduct,
  editProductTakeReducer,
  purchaseStockProductReducer,
  addCategoryReducer,
  getCategoryReducer,
  deleteCategoryReducer,
} from "./reducers/productReducer";
import thunk from "redux-thunk";
import logger from "redux-logger";

const appReducer = combineReducers({
  staffData: staffRegsterReducer,
  staffLginData: staffLoginReducer,
  productDetails: addProductReducer,
  showProInfo: getProductReducer,
  deleteInfo: deleteProReducer,
  editData: editProduct,
  showStaff: staffShowingReducer,
  changeStatus: staffStatusChangeReducer,
  editSuccess: editProductTakeReducer,
  purcaseDetails: purchaseStockProductReducer,
  addCategory: addCategoryReducer,
  getCategory: getCategoryReducer,
  deleteCategory: deleteCategoryReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let Middleware = [thunk, logger];

const store = createStore(
  appReducer,
  composeEnhancers(applyMiddleware(...Middleware))
);
export default store;

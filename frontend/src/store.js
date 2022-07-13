import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import {
  staffLoginReducer,
  staffRegsterReducer,
  staffShowingReducer,
  staffStatusChangeReducer,
} from "./reducers/staffReducer";
import {
  deleteProReducer,
  getProductReducer,
  editProduct,
  editProductTakeReducer,
  purchaseStockProductReducer,
  increasStockValueReducer,
  // downloadBarCodeReducer,
  addProductExcelReducer,
  billingReducer,
  billingDetailsReducer,
  increasQtyValueReducer,
  decreasBillingQtyReducer,
  ladgerBookReducer,
  AddladgerBookReducer,
  categorySelectReducer,
  ladgerBookshowReducer,
  getCategoryReducer,
  addCategoryReducer,
  subCategoryReducer,
  deleteSubCategoryReducer,
  deleteCategoryReducer,
  getSubCategoriesReducer,
} from "./reducers/productReducer";
import thunk from "redux-thunk";
import logger from "redux-logger";
import {
  ProductManageColomnHideAndVisibleReducer,
  ProductManageColomnHideAndVisibleShowReducer,
} from "./reducers/SettingReducer";

const appReducer = combineReducers({
  staffData: staffRegsterReducer,
  staffLginData: staffLoginReducer,
  productDetails: addProductExcelReducer,
  showProInfo: getProductReducer,
  deleteInfo: deleteProReducer,
  editData: editProduct,
  showStaff: staffShowingReducer,
  changeStatus: staffStatusChangeReducer,
  editSuccess: editProductTakeReducer,
  purcaseDetails: purchaseStockProductReducer,
  increasStockValue: increasStockValueReducer,
  ProductManageColomnHideAndVisible: ProductManageColomnHideAndVisibleReducer,
  ProductManageColomnHideAndVisibleShow:
    ProductManageColomnHideAndVisibleShowReducer,
  billing: billingReducer,
  increasQtyValue: increasQtyValueReducer,
  decreasBillingQty: decreasBillingQtyReducer,
  ladgerBook: ladgerBookReducer,
  AddladgerBook: AddladgerBookReducer,
  categorySelect: categorySelectReducer,
  ladgerBookshow: ladgerBookshowReducer,
  getCategory: getCategoryReducer,
  addCategory: addCategoryReducer,
  subCategory: subCategoryReducer,
  deleteSubCategory: deleteSubCategoryReducer,
  deleteCategory: deleteCategoryReducer,
  getSubCategories: getSubCategoriesReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let Middleware = [thunk, logger];

const store = createStore(
  appReducer,
  composeEnhancers(applyMiddleware(...Middleware))
);
export default store;

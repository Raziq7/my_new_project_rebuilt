import {
  PRODUCT_MANAGE_COLUMNS_HIDE_ERR,
  PRODUCT_MANAGE_COLUMNS_HIDE_REQUEST,
  PRODUCT_MANAGE_COLUMNS_HIDE_SHOW_ERR,
  PRODUCT_MANAGE_COLUMNS_HIDE_SHOW_REQUEST,
  PRODUCT_MANAGE_COLUMNS_HIDE_SHOW_SUCCESS,
  PRODUCT_MANAGE_COLUMNS_HIDE_SUCCESS,
} from "../constant/SettingConstant.";

export const ProductManageColomnHideAndVisibleReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case PRODUCT_MANAGE_COLUMNS_HIDE_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_MANAGE_COLUMNS_HIDE_SUCCESS:
      return {
        loading: false,
        columnHideAndVisible: action.payload,
      };
    case PRODUCT_MANAGE_COLUMNS_HIDE_ERR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const ProductManageColomnHideAndVisibleShowReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case PRODUCT_MANAGE_COLUMNS_HIDE_SHOW_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_MANAGE_COLUMNS_HIDE_SHOW_SUCCESS:
      return {
        loading: false,
        columnHideAndVisibleShow: action.payload,
      };
    case PRODUCT_MANAGE_COLUMNS_HIDE_SHOW_ERR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

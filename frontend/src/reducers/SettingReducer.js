import { PRODUCT_MANAGE_COLUMNS_HIDE } from "../constant/SettingConstant.";

export const ProductManageColomnHideAndVisibleReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case PRODUCT_MANAGE_COLUMNS_HIDE:
      return {
        columnHideAndVisible: action.payload,
      };
    default:
      return state;
  }
};

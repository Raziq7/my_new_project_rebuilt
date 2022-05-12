import { PRODUCT_MANAGE_COLUMNS_HIDE } from "../constant/SettingConstant.";

export const ProductManageColomnHideAndVisible =
  (id, title) => async (dispatch, getState) => {
    console.log("hello");
    dispatch({ type: PRODUCT_MANAGE_COLUMNS_HIDE, payload: { id, title } });
    console.log(
      localStorage.getItem("productColumn", JSON.stringify({ id, title }))
    );

    localStorage.setItem(
      "productColumn",
      JSON.stringify({ status: id, name: title })
    );
  };

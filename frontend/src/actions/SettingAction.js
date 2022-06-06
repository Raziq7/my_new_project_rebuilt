import axios from "axios";
import {
  PRODUCT_MANAGE_COLUMNS_HIDE_ERR,
  PRODUCT_MANAGE_COLUMNS_HIDE_REQUEST,
  PRODUCT_MANAGE_COLUMNS_HIDE_SHOW_ERR,
  PRODUCT_MANAGE_COLUMNS_HIDE_SHOW_REQUEST,
  PRODUCT_MANAGE_COLUMNS_HIDE_SHOW_SUCCESS,
  PRODUCT_MANAGE_COLUMNS_HIDE_SUCCESS,
} from "../constant/SettingConstant.";

export const ProductManageColomnHideAndVisible =
  (id, title) => async (dispatch, getState) => {
    try {
      console.log(title, "title");
      console.log(id, "idididid");

      dispatch({
        type: PRODUCT_MANAGE_COLUMNS_HIDE_REQUEST,
      });

      let { data } = await axios.post(
        "/api/superAdmin/ProductManageColomnHideAndVisible",
        { id, title }
      );

      dispatch({ type: PRODUCT_MANAGE_COLUMNS_HIDE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: PRODUCT_MANAGE_COLUMNS_HIDE_ERR, payload: error });
    }
  };

export const ProductManageColomnHideAndVisibleShow =
  () => async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCT_MANAGE_COLUMNS_HIDE_SHOW_REQUEST,
      });

      let { data } = await axios.get(
        "/api/superAdmin/ProductManageColomnHideAndVisibleShow"
      );

      dispatch({
        type: PRODUCT_MANAGE_COLUMNS_HIDE_SHOW_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({ type: PRODUCT_MANAGE_COLUMNS_HIDE_SHOW_ERR, payload: error });
    }
  };

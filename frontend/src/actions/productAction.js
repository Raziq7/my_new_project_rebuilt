import axios from "axios";
import {
  ADD_ONE_PRODUCT,
  ADD_PRODUCT_FAILED,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERR,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  EDIT_PRODUCT_ERROR,
  EDIT_PRODUCT_REQUEST,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_TAKE_ERR,
  EDIT_PRODUCT_TAKE_REQUEST,
  EDIT_PRODUCT_TAKE_SUCCESS,
  PURCHASE_STOCK_REQUEST,
  PURCHASE_STOCK_SUCCESS,
  PURCHASE_STOCK_ERR,
  SHOW_PRODUCT_ERR,
  SHOW_PRODUCT_REQUEST,
  SHOW_PRODUCT_SUCCESS,
  CATEGORY_SET_REQUEST,
  CATEGORY_SET_SUCCESS,
  CATEGORY_SET_ERR,
  CATEGORY_GET_SUCCESS,
  CATEGORY_GET_ERR,
  CATEGORY_GET_REQUEST,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_ERR,
} from "../constant/productConstant";

export const addProductAction = (details) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_PRODUCT_REQUEST });

    let { data } = await axios.post("/api/superAdmin", details);

    dispatch({ type: ADD_PRODUCT_SUCCESS, payload: details });

    localStorage.setItem("productInfo", JSON.stringify(data));
  } catch (err) {
    dispatch({ type: ADD_PRODUCT_FAILED });
  }
};

export const showProductAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: SHOW_PRODUCT_REQUEST });

    let { data } = await axios.get("/api/superAdmin/getProduct");

    dispatch({ type: SHOW_PRODUCT_SUCCESS, payload: data });
  } catch (err) {
    console.log(err);
    dispatch({ type: SHOW_PRODUCT_ERR });
  }
};

//delete Product
export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    let { data } = await axios.delete(`/api/superAdmin/deletePro/?id=${id}`);

    dispatch({ type: DELETE_PRODUCT_SUCCESS });
  } catch (err) {
    dispatch({ type: DELETE_PRODUCT_ERR });
    console.log(err);
  }
};

//add one Product in socket-io

export const addOneProduct = (data) => (dispatch, getState) => {
  try {
    dispatch({ type: ADD_ONE_PRODUCT, payload: data });
  } catch (err) {
    console.log(err);
  }
};

//Edit get Product

export const editProduct = (proId) => async (dispatch, getState) => {
  try {
    dispatch({ type: EDIT_PRODUCT_REQUEST });

    let { data } = await axios.get(`/api/superAdmin/editPro?id=${proId}`);

    dispatch({ type: EDIT_PRODUCT_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: EDIT_PRODUCT_ERROR });
    console.log(err);
  }
};

//Edit Product

export const editProductTake = (detail) => async (dispatch, getState) => {
  try {
    dispatch({ type: EDIT_PRODUCT_TAKE_REQUEST });

    let { data } = await axios.put(
      `/api/superAdmin/editProTake?id=${detail._id}`,
      {
        detail,
      }
    );

    dispatch({ type: EDIT_PRODUCT_TAKE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: EDIT_PRODUCT_TAKE_ERR });
    console.log(err);
  }
};

// purchase Stocks
export const getPurchaseData = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PURCHASE_STOCK_REQUEST });

    let { data } = await axios.get("/api/superAdmin/parchaseHistory");

    dispatch({ type: PURCHASE_STOCK_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: PURCHASE_STOCK_ERR });
    console.log(err);
  }
};

// Category Setting

export const setCategoryAction =
  (category, mode) => async (dispatch, getState) => {
    try {
      dispatch({ type: CATEGORY_SET_REQUEST });

      let { data } = await axios.post("/api/superAdmin/categorySet", {
        categoryName: category,
        mode,
      });

      dispatch({ type: CATEGORY_SET_SUCCESS, payload: data });
    } catch (err) {
      console.log(err);
      dispatch({ type: CATEGORY_SET_ERR });
    }
  };

//Category Showing

export const getShowCategory = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CATEGORY_GET_REQUEST });

    let { data } = await axios.get("/api/superAdmin/getCategories");

    dispatch({ type: CATEGORY_GET_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: CATEGORY_GET_ERR, payload: err });
  }
};

//delete Category

export const deleteCategory = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CATEGORY_DELETE_REQUEST });

    let { data } = await axios.delete(
      `/api/superAdmin/deleteCategory?id=${id}`
    );

    dispatch({ type: CATEGORY_DELETE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: CATEGORY_DELETE_ERR, payload: err });
  }
};

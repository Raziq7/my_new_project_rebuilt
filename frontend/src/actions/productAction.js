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
  INC_PURCHASE_VALUE_REQUEST,
  INC_PURCHASE_VALUE_SUCCESS,
  INC_PURCHASE_VALUE_ERR,
  DOWNLOAD_BAR_CODE_REQUEST,
  DOWNLOAD_BAR_CODE_SUCCESS,
  DOWNLOAD_BAR_CODE_ERR,
  BILLING_VALUE_REQUEST,
  BILLING_VALUE_SUCCESS,
  BILLING_VALUE_ERR,
  INCREAS_BILLING_QTY_REQUEST,
  INCREAS_BILLING_QTY_SUCCESS,
  INCREAS_BILLING_QTY_ERR,
  DECREAS_BILLING_QTY_REQUEST,
  DECREAS_BILLING_QTY_SUCCESS,
  DECREAS_BILLING_QTY_ERR,
  DELETE_BILLING_PRO_REQUEST,
  DELETE_BILLING_PRO_SUCCESS,
  DELETE_BILLING_PRO_ERR,
} from "../constant/productConstant";

// export const addProductAction = (details) => async (dispatch, getState) => {
//   try {
//     dispatch({ type: ADD_PRODUCT_REQUEST });

//     let { data } = await axios.post("/api/superAdmin", details);

//     dispatch({ type: ADD_PRODUCT_SUCCESS, payload: details });

//     localStorage.setItem("productInfo", JSON.stringify(data));
//   } catch (err) {
//     dispatch({ type: ADD_PRODUCT_FAILED });
//   }
// };

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
      detail
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

//increasStockValue
export const increasStockValue = (value, id) => async (dispatch, getState) => {
  try {
    dispatch({ type: INC_PURCHASE_VALUE_REQUEST });

    let { data } = await axios.post("/api/superAdmin/increasStock", {
      value,
      id,
    });

    dispatch({ type: INC_PURCHASE_VALUE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: INC_PURCHASE_VALUE_ERR });
  }
};

export const downloadBarCode = (id) => async (dispatch, getState) => {
  try {
    console.log("downloadClick", id);

    dispatch({ type: DOWNLOAD_BAR_CODE_REQUEST });

    let { data } = await axios.post("/api/superAdmin/downloadBarcode", { id });

    dispatch({ type: DOWNLOAD_BAR_CODE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: DOWNLOAD_BAR_CODE_ERR, payload: err });
  }
};

export const addProductExcel = (file) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_PRODUCT_REQUEST });

    console.log(file, "22222222222222");
    let { data } = await axios.post("/api/superAdmin/addProductPost", file);
    dispatch({ type: ADD_PRODUCT_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: ADD_PRODUCT_FAILED, payload: err });
  }
};

export const billingAction = (value) => async (dispatch, getState) => {
  try {
    dispatch({ type: BILLING_VALUE_REQUEST });

    let { data } = await axios.post("/api/superAdmin/billing", { value });

    dispatch({ type: BILLING_VALUE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: BILLING_VALUE_ERR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//increas Qty Value

export const increasQtyValue = (qty, id) => async (dispacth, getState) => {
  try {
    dispacth({ type: INCREAS_BILLING_QTY_REQUEST });

    let { data } = await axios.post("/api/superAdmin/increasBillingQty", {
      qty,
      id,
    });

    dispacth({ type: INCREAS_BILLING_QTY_SUCCESS, payload: data });
  } catch (error) {
    dispacth({
      type: INCREAS_BILLING_QTY_ERR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//decreasBillingQty

export const decreasBillingQty = (id) => async (dispacth, getState) => {
  try {
    dispacth({ type: DECREAS_BILLING_QTY_REQUEST });

    let { data } = await axios.post("/api/superAdmin/decreasBillingQty", {
      id,
    });

    dispacth({ type: DECREAS_BILLING_QTY_SUCCESS, payload: data });
  } catch (error) {
    dispacth({
      type: DECREAS_BILLING_QTY_ERR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//deleteBillingPro

export const deleteBillingPro = (id) => async (dispacth, getState) => {
  try {
    dispacth({ type: DELETE_BILLING_PRO_REQUEST });

    let { data } = await axios.post("/api/superAdmin/deleteBillingPro", {
      id,
    });

    dispacth({ type: DELETE_BILLING_PRO_SUCCESS, payload: data });
  } catch (error) {
    dispacth({
      type: DELETE_BILLING_PRO_ERR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// export const billingDetailsAction = () => async (dispatch, getState) => {
//   try {
//     dispatch({ type: BILLING_DETAILS_REQUEST });

//     let { data } = await axios.get("/api/superAdmin/getBillingDetails");

//     dispatch({ type: BILLING_DETAILS_SUCCESS, payload: data });
//   } catch (err) {
//     dispatch({ type: BILLING_DETAILS_ERR, payload: err });
//   }
// };

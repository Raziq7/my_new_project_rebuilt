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
  LADGER_BOOK_REQUEST,
  LADGER_BOOK_SUCCESS,
  LADGER_BOOK_ERR,
  ADD_LADGER_BOOK_REQUEST,
  ADD_LADGER_BOOK_SUCCESS,
  ADD_LADGER_BOOK_ERR,
  ADD_CATEGORY_SET_REQUEST,
  ADD_CATEGORY_SET_SUCCESS,
  ADD_CATEGORY_SET_ERR,
  SHOW_CATEGORY_SET_SUCCESS,
  SHOW_CATEGORY_SET_REQUEST,
  SHOW_CATEGORY_SET_ERR,
  CATEGORY_SET_REQUEST,
  CATEGORY_SET_SUCCESS,
  CATEGORY_SET_ERR,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_GET_ERR,
  SUB_CATEGORY_REQUEST,
  SUB_CATEGORY_SUCCESS,
  SUB_CATEGORY_ERR,
  GET_SUB_CATEGORY_REQUEST,
  GET_SUB_CATEGORY_SUCCESS,
  GET_SUB_CATEGORY_ERR,
  DELETE_SUB_CATEGORY_REQUEST,
  DELETE_SUB_CATEGORY_SUCCESS,
  DELETE_SUB_CATEGORY_ERR,
  CATEGORY_GET_REQUEST,
  CATEGORY_GET_SUCCESS,
  CATEGORY_DELETE_ERR,
  DELETE_LEDGER_REQUEST,
  DELETE_LEDGER_SUCCESS,
  DELETE_LEDGER_ERR,
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
    console.log(
      data,
      "SHOW_PRODUCT_REQUESTSHOW_PRODUCT_REQUESTSHOW_PRODUCT_REQUESTSHOW_PRODUCT_REQUEST"
    );

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
  } catch (error) {
    dispatch({
      type: INC_PURCHASE_VALUE_ERR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
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

export const checkoutBill =
  (billInfo, grandTotal, Tracking) => async (dispacth, getState) => {
    alert(Tracking);
    try {
      dispacth({ type: INCREAS_BILLING_QTY_REQUEST });

      let { data } = await axios.post("/api/superAdmin/checkoutBillingQty", {
        billInfo,
        grandTotal,
        Tracking,
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

// export const decreasBillingQty = (id) => async (dispacth, getState) => {
//   try {
//     dispacth({ type: DECREAS_BILLING_QTY_REQUEST });

//     let { data } = await axios.post("/api/superAdmin/decreasBillingQty", {
//       id,
//     });

//     dispacth({ type: DECREAS_BILLING_QTY_SUCCESS, payload: data });
//   } catch (error) {
//     dispacth({
//       type: DECREAS_BILLING_QTY_ERR,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };

//deleteBillingPro

// export const deleteBillingPro = (id) => async (dispacth, getState) => {
//   try {
//     dispacth({ type: DELETE_BILLING_PRO_REQUEST });

//     let { data } = await axios.post("/api/superAdmin/deleteBillingPro", {
//       id,
//     });

//     dispacth({ type: DELETE_BILLING_PRO_SUCCESS, payload: data });
//   } catch (error) {
//     dispacth({
//       type: DELETE_BILLING_PRO_ERR,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };

export const ladgerBookAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: LADGER_BOOK_REQUEST });

    let { data } = await axios.get("/api/superAdmin/ladgerBook");

    dispatch({ type: LADGER_BOOK_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: LADGER_BOOK_ERR, payload: err });
  }
};

export const AddladgerBookAction = (details) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_LADGER_BOOK_REQUEST });

    let { data } = await axios.post("/api/superAdmin/AddladgerBook", {
      details,
    });

    dispatch({ type: ADD_LADGER_BOOK_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: ADD_LADGER_BOOK_ERR, payload: err });
  }
};
export const categorySelect = (category) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_CATEGORY_SET_REQUEST });

    let { data } = await axios.post("/api/superAdmin/categoryAdd", {
      category,
    });

    dispatch({ type: ADD_CATEGORY_SET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADD_CATEGORY_SET_ERR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const ladgerBookshow = () => async (dispatch, getState) => {
  try {
    dispatch({ type: SHOW_CATEGORY_SET_REQUEST });

    let { data } = await axios.get("/api/superAdmin/ladgerBookshow");

    dispatch({ type: SHOW_CATEGORY_SET_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: SHOW_CATEGORY_SET_ERR, payload: err });
  }
};

//category

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

//set Sub Category
export const setSubCategoryAction =
  ({ value, mainValue }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: SUB_CATEGORY_REQUEST });

      let { data } = await axios.post("/api/superAdmin/setSubCategory", {
        value,
        mainValue,
      });

      dispatch({ type: SUB_CATEGORY_SUCCESS, payload: data });
    } catch (err) {
      dispatch({ type: SUB_CATEGORY_ERR, payload: err });
      console.log(err);
    }
  };

//get Sub Category
export const getSubCategory = () => async (dispatch, getState) => {
  console.log("got it");
  try {
    dispatch({ type: GET_SUB_CATEGORY_REQUEST });

    let { data } = await axios.get("/api/superAdmin/getCategory");

    dispatch({ type: GET_SUB_CATEGORY_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: GET_SUB_CATEGORY_ERR, payload: err });
  }
};

//delete SubCat
export const deleteSubCatAction =
  ({ value, sub }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: DELETE_SUB_CATEGORY_REQUEST });

      let { data } = await axios.post("/api/superAdmin/deleteSubCategory", {
        value,
        sub,
      });

      dispatch({ type: DELETE_SUB_CATEGORY_SUCCESS, payload: data });
    } catch (err) {
      dispatch({ type: DELETE_SUB_CATEGORY_ERR, payload: err });
      console.log(err);
    }
  };

//delete LedgerAction
export const ledgerDeleteAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_LEDGER_REQUEST });

    let { data } = await axios.delete(`/api/superAdmin/deleteLedger/?id=${id}`);

    dispatch({ type: DELETE_LEDGER_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: DELETE_LEDGER_ERR, payload: err });
    console.log(err);
  }
};

import axios from "axios";
import { useDispatch } from "react-redux";
import {
  ADD_PRODUCT_FAILED,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERR,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  SHOW_PRODUCT_ERR,
  SHOW_PRODUCT_REQUEST,
  SHOW_PRODUCT_SUCCESS,
} from "../constant/productConstant";

export const addProductAction = (details) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_PRODUCT_REQUEST });

    let { data } = await axios.post("/api/superAdmin", details);

    console.log(data, "action page");

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
  console.log(id, "idddddddddddddddd");
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    let { data } = await axios.delete(`/api/superAdmin/deletePro/?id=${id}`);

    dispatch({ type: DELETE_PRODUCT_SUCCESS });
  } catch (err) {
    dispatch({ type: DELETE_PRODUCT_ERR });
    console.log(err);
  }
};

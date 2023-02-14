import {
  STAFF_REGISTER_SUCCESS,
  STAFF_REGISTER_REQUEST,
  STAFF_LOGIN_REQUEST,
  STAFF_LOGIN_SUCCESS,
  STAFF_LOGIN_ERROR,
  STAFF_SHOWING_REQUEST,
  STAFF_SHOWING_SUCCESS,
  STAFF_SHOWING_ERR,
  STAFF_STATUS_REQUEST,
  STAFF_STATUS_SUCCESS,
  STAFF_STATUS_ERR,
} from "../constant/staffAdmin";
import axios from "axios";

export const staffRegster = (detail) => async (dispatch, getState) => {
  try {
    dispatch({
      type: STAFF_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/staff", detail, config);

    dispatch({
      type: STAFF_REGISTER_SUCCESS,
      payload: data,
    });
    // localStorage.setItem("staffInfo", JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

//Login
export const staffLogin = (details) => async (dispatch, getState) => {
  try {
    dispatch({
      type: STAFF_LOGIN_REQUEST,
    });
    let { data } = await axios.post("/api/staff/login", details);

    dispatch({
      type: STAFF_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("staffInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: STAFF_LOGIN_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//Show Staffs
export const staffShow = () => async (dispatch, getState) => {
  try {
    dispatch({ type: STAFF_SHOWING_REQUEST });

    let { data } = await axios.get("/api/staff/showStaff");

    dispatch({ type: STAFF_SHOWING_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: STAFF_SHOWING_ERR });
  }
};

//status Change staffs
export const staffStatusChange = (status) => async (dispatch, getState) => {
  try {
    dispatch({ type: STAFF_STATUS_REQUEST });

    let { data } = await axios.post("/api/staff/changeStatus", {
      id: status.id,
      status: status.status,
    });

    console.log(data, "chage data");
    dispatch({ type: STAFF_STATUS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: STAFF_STATUS_ERR });
  }
};

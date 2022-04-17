import {
  STAFF_REGISTER_SUCCESS,
  STAFF_REGISTER_REQUEST,
  STAFF_LOGIN_REQUEST,
  STAFF_LOGIN_SUCCESS,
  STAFF_LOGIN_ERROR,
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
    localStorage.setItem("staffInfo", JSON.stringify(data));
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

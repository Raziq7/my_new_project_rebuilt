import {
  STAFF_REGISTER_SUCCESS,
  STAFF_REGISTER_FAILED,
  STAFF_REGISTER_REQUEST,
  STAFF_LOGOUT,
  STAFF_LOGIN_REQUEST,
  STAFF_LOGIN_SUCCESS,
  STAFF_LOGIN_ERROR,
  STAFF_SHOWING_REQUEST,
  STAFF_SHOWING_SUCCESS,
  STAFF_SHOWING_ERR,
  STAFF_STATUS_REQUEST,
  STAFF_STATUS_SUCCESS,
  STAFF_STATUS_ERR,
  STAFF_LOGIN_RESET,
} from "../constant/staffAdmin";

export const staffRegsterReducer = (state = {}, action) => {
  switch (action.type) {
    case STAFF_REGISTER_REQUEST:
      return { loading: true };
    case STAFF_REGISTER_SUCCESS:
      return { loading: false, staffInfo: action.payload };
    case STAFF_REGISTER_FAILED:
      return { loading: false, error: action.payload };
    case STAFF_LOGOUT:
      return {};
    default:
      return state;
  }
};

//LOGIN
export const staffLoginReducer = (
  state = { staffInfo: JSON.parse(localStorage.getItem("staffInfo")) },
  action
) => {
  switch (action.type) {
    case STAFF_LOGIN_REQUEST:
      return { loading: true };
    case STAFF_LOGIN_SUCCESS:
      return {
        loading: false,
        staffInfo: action.payload,
      };
    case STAFF_LOGIN_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    case STAFF_LOGIN_RESET:
      return {
        ...state,
        staffInfo: null,
      };
    default:
      return state;
  }
};

//showing Staffs
export const staffShowingReducer = (
  state = { loading: true, viewStaff: [] },
  action
) => {
  switch (action.type) {
    case STAFF_SHOWING_REQUEST:
      return {
        loading: true,
      };
    case STAFF_SHOWING_SUCCESS:
      return {
        loading: false,
        viewStaff: action.payload,
      };
    case STAFF_SHOWING_ERR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

//change status

export const staffStatusChangeReducer = (state = {}, action) => {
  switch (action.type) {
    case STAFF_STATUS_REQUEST:
      return {
        loading: true,
      };
    case STAFF_STATUS_SUCCESS:
      return {
        loading: false,
        changeStatus: action.payload,
      };
    case STAFF_STATUS_ERR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

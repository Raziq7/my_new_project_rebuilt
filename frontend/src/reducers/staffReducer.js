import {
  STAFF_REGISTER_SUCCESS,
  STAFF_REGISTER_FAILED,
  STAFF_REGISTER_REQUEST,
  STAFF_LOGOUT,
  STAFF_LOGIN_REQUEST,
  STAFF_LOGIN_SUCCESS,
  STAFF_LOGIN_ERROR,
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
export const staffLoginReducer = (state = {}, action) => {
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
    default:
      return state;
  }
};

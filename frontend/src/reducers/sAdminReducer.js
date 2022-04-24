import {
  ADD_ONE_PRODUCT,
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

export const addProductReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_PRODUCT_REQUEST:
      return {
        loading: true,
      };
    case ADD_PRODUCT_SUCCESS:
      return {
        loading: false,
        productDetail: action.payload,
      };
    case ADD_PRODUCT_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

//show Product
export const getProductReducer = (
  state = { loading: true, showProduct: [] },
  action
) => {
  switch (action.type) {
    case SHOW_PRODUCT_REQUEST:
      return {
        loading: true,
      };
    case SHOW_PRODUCT_SUCCESS:
      return {
        loading: false,
        showProduct: action.payload,
      };
    case SHOW_PRODUCT_ERR:
      return {
        loading: false,
        error: action.payload,
      };
    case ADD_ONE_PRODUCT:
      return {
        ...state,
        showProduct: {
          showProduct: [...state.showProduct.showProduct, action.payload],
        },
      };
    default:
      return state;
  }
};

//delete Product
export const deleteProReducer = (state = { deleteDetail: false }, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_REQUEST:
      return {
        loading: true,
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        deleteDetail: true,
        loading: false,
      };
    case DELETE_PRODUCT_ERR:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

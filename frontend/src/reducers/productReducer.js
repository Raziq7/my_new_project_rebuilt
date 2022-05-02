import {
  ADD_ONE_PRODUCT,
  ADD_PRODUCT_FAILED,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  CATEGORY_DELETE_ERR,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_GET_ERR,
  CATEGORY_GET_REQUEST,
  CATEGORY_GET_SUCCESS,
  CATEGORY_SET_ERR,
  CATEGORY_SET_REQUEST,
  CATEGORY_SET_SUCCESS,
  DELETE_PRODUCT_ERR,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  EDIT_PRODUCT_ERROR,
  EDIT_PRODUCT_REQUEST,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_TAKE_ERR,
  EDIT_PRODUCT_TAKE_REQUEST,
  EDIT_PRODUCT_TAKE_SUCCESS,
  PURCHASE_STOCK_ERR,
  PURCHASE_STOCK_REQUEST,
  PURCHASE_STOCK_SUCCESS,
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

//Edit Product
export const editProduct = (state = { editInfo: null }, action) => {
  switch (action.type) {
    case EDIT_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case EDIT_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        editInfo: action.payload,
      };
    case EDIT_PRODUCT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

//edit product take

export const editProductTakeReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_PRODUCT_TAKE_REQUEST:
      return {
        loading: true,
      };
    case EDIT_PRODUCT_TAKE_SUCCESS:
      return {
        loading: false,
        editSuccess: action.payload,
      };
    case EDIT_PRODUCT_TAKE_ERR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

//PURCHASE STOCK PRODUCTS

export const purchaseStockProductReducer = (
  state = { purchaseData: [] },
  action
) => {
  switch (action.type) {
    case PURCHASE_STOCK_REQUEST:
      return {
        loading: true,
      };
    case PURCHASE_STOCK_SUCCESS:
      return {
        loading: false,
        purchaseData: action.payload,
      };
    case PURCHASE_STOCK_ERR:
      return {
        loading: false,
      };
    default:
      return state;
  }
};

//category add

export const addCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_SET_REQUEST:
      return {
        loading: true,
      };
    case CATEGORY_SET_SUCCESS:
      return {
        loading: false,
        setcategory: action.payload,
      };
    case CATEGORY_SET_ERR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

//getCategory
export const getCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_GET_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CATEGORY_GET_SUCCESS:
      return {
        ...state,
        showCategory: action.payload,
        loading: false,
      };
    case CATEGORY_GET_ERR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Delete Category

export const deleteCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CATEGORY_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        deleteCatData: action.payload,
      };
    case CATEGORY_DELETE_ERR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

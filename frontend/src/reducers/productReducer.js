import {
  ADD_CATEGORY_SET_ERR,
  ADD_CATEGORY_SET_REQUEST,
  ADD_CATEGORY_SET_SUCCESS,
  ADD_LADGER_BOOK_ERR,
  ADD_LADGER_BOOK_REQUEST,
  ADD_LADGER_BOOK_SUCCESS,
  ADD_ONE_PRODUCT,
  ADD_PRODUCT_FAILED,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  BILLING_DETAILS_REQUEST,
  BILLING_DETAILS_SUCCESS,
  BILLING_VALUE_ERR,
  BILLING_VALUE_REQUEST,
  BILLING_VALUE_SUCCESS,
  CATEGORY_DELETE_ERR,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_GET_ERR,
  CATEGORY_GET_REQUEST,
  CATEGORY_GET_SUCCESS,
  CATEGORY_SET_ERR,
  CATEGORY_SET_REQUEST,
  CATEGORY_SET_SUCCESS,
  DECREAS_BILLING_QTY_ERR,
  DECREAS_BILLING_QTY_REQUEST,
  DECREAS_BILLING_QTY_SUCCESS,
  DELETE_PRODUCT_ERR,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_SUB_CATEGORY_ERR,
  DELETE_SUB_CATEGORY_REQUEST,
  DELETE_SUB_CATEGORY_SUCCESS,
  DOWNLOAD_BAR_CODE_ERR,
  DOWNLOAD_BAR_CODE_REQUEST,
  DOWNLOAD_BAR_CODE_SUCCESS,
  EDIT_PRODUCT_ERROR,
  EDIT_PRODUCT_REQUEST,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_TAKE_ERR,
  EDIT_PRODUCT_TAKE_REQUEST,
  EDIT_PRODUCT_TAKE_SUCCESS,
  GET_SUB_CATEGORY_ERR,
  GET_SUB_CATEGORY_REQUEST,
  GET_SUB_CATEGORY_SUCCESS,
  INCREAS_BILLING_QTY_ERR,
  INCREAS_BILLING_QTY_REQUEST,
  INCREAS_BILLING_QTY_SUCCESS,
  INC_PURCHASE_VALUE_ERR,
  INC_PURCHASE_VALUE_REQUEST,
  INC_PURCHASE_VALUE_SUCCESS,
  LADGER_BOOK_ERR,
  LADGER_BOOK_REQUEST,
  LADGER_BOOK_SUCCESS,
  PURCHASE_STOCK_ERR,
  PURCHASE_STOCK_REQUEST,
  PURCHASE_STOCK_SUCCESS,
  SHOW_CATEGORY_SET_ERR,
  SHOW_CATEGORY_SET_REQUEST,
  SHOW_CATEGORY_SET_SUCCESS,
  SHOW_PRODUCT_ERR,
  SHOW_PRODUCT_REQUEST,
  SHOW_PRODUCT_SUCCESS,
  SUB_CATEGORY_ERR,
  SUB_CATEGORY_REQUEST,
  SUB_CATEGORY_SUCCESS,
} from "../constant/productConstant";

export const addProductExcelReducer = (state = {}, action) => {
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

//increas Stock Value

export const increasStockValueReducer = (state = {}, action) => {
  switch (action.type) {
    case INC_PURCHASE_VALUE_REQUEST:
      return {
        loading: true,
      };
    case INC_PURCHASE_VALUE_SUCCESS:
      return {
        loading: false,
        increaseStock: action.payload,
      };
    case INC_PURCHASE_VALUE_ERR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

//download BarCode

export const billingReducer = (state = {}, action) => {
  switch (action.type) {
    case BILLING_VALUE_REQUEST:
      return {
        loading: true,
      };
    case BILLING_VALUE_SUCCESS:
      return {
        ...state,
        loading: false,
        BillDetail: action.payload,
      };
    case BILLING_VALUE_ERR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const increasQtyValueReducer = (state = {}, action) => {
  switch (action.type) {
    case INCREAS_BILLING_QTY_REQUEST:
      return {
        loading: true,
      };
    case INCREAS_BILLING_QTY_SUCCESS:
      return {
        ...state,
        loading: false,
        Billinc: action.payload,
      };
    case INCREAS_BILLING_QTY_ERR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const decreasBillingQtyReducer = (state = {}, action) => {
  switch (action.type) {
    case DECREAS_BILLING_QTY_REQUEST:
      return {
        loading: true,
      };
    case DECREAS_BILLING_QTY_SUCCESS:
      return {
        ...state,
        loading: false,
        Billdec: action.payload,
      };
    case DECREAS_BILLING_QTY_ERR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const ladgerBookReducer = (state = {}, action) => {
  switch (action.type) {
    case LADGER_BOOK_REQUEST:
      return {
        loading: true,
      };
    case LADGER_BOOK_SUCCESS:
      return {
        loading: false,
        ladger: action.payload,
      };
    case LADGER_BOOK_ERR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const AddladgerBookReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_LADGER_BOOK_REQUEST:
      return {
        loading: true,
      };
    case ADD_LADGER_BOOK_SUCCESS:
      return {
        loading: false,
        addladger: action.payload,
      };
    case ADD_LADGER_BOOK_ERR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const categorySelectReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_CATEGORY_SET_REQUEST:
      return {
        loading: true,
      };
    case ADD_CATEGORY_SET_SUCCESS:
      return {
        loading: false,
        categoryLadger: action.payload,
      };
    case ADD_CATEGORY_SET_ERR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const ladgerBookshowReducer = (state = {}, action) => {
  switch (action.type) {
    case SHOW_CATEGORY_SET_REQUEST:
      return {
        loading: true,
      };
    case SHOW_CATEGORY_SET_SUCCESS:
      return {
        loading: false,
        showcategoryLadger: action.payload,
      };
    case SHOW_CATEGORY_SET_ERR:
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

//Sub Categoty
export const subCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case SUB_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SUB_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        subCategoryData: action.payload,
      };
    case SUB_CATEGORY_ERR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

//delete SubCategory

export const deleteSubCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_SUB_CATEGORY_REQUEST:
      return {
        loading: true,
      };
    case DELETE_SUB_CATEGORY_SUCCESS:
      return {
        loading: false,
        deleteSubCat: action.payload,
      };
    case DELETE_SUB_CATEGORY_ERR:
      return {
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

//get SubCategory
export const getSubCategoriesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SUB_CATEGORY_REQUEST:
      return {
        loading: true,
      };
    case GET_SUB_CATEGORY_SUCCESS:
      return {
        loading: false,
        showSubCategory: action.payload,
      };
    case GET_SUB_CATEGORY_ERR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

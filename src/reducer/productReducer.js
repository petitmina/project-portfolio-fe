// import { createSlice } from "@reduxjs/toolkit";
// import { createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../utils/api";

// export const createProduct = createAsyncThunk(
//   "product/createProduct",
//   async ({ formData }, { fulfilWithValue, rejectWithValue }) => {
//     try {
//       const response = await api.post("/product", formData);
//       return fulfilWithValue(response.data);
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const getProductList = createAsyncThunk(
//   "product/getProductList",
//   async ({ query }, { fulfilWithValue, rejectWithValue }) => {
//     try {
//       const response = await api.get("/product", {
//         params: { ...query },
//       });
//       return fulfilWithValue(response.data);
//     } catch (error) {
//       return rejectWithValue(error.error);
//     }
//   }
// );

// export const getProductDetail = createAsyncThunk(
//   "product/getProductDetail",
//   async ({ id }, { fulfilWithValue, rejectWithValue }) => {
//     try {
//       const response = await api.get(`/product/${id}`);
//       return fulfilWithValue(response.data.data);
//     } catch (error) {
//       return rejectWithValue(error.error);
//     }
//   }
// );

// export const deleteProduct = createAsyncThunk(
//   "product/deleteProduct",
//   async ({ id }, { fulfilWithValue, rejectWithValue, dispatch }) => {
//     try {
//       const response = await api.delete(`/product/${id}`);
//       return fulfilWithValue(
//         response.data,
//         dispatch(getProductDetail({ page: 1, name: "" }))
//       );
//     } catch (error) {
//       return rejectWithValue(error.error);
//     }
//   }
// );

// export const editProduct = createAsyncThunk(
//   "product/editProduct",
//   async ({ formData, id }, { fulfilWithValue, rejectWithValue, dispatch}) => {
//     try {
//       const response = await api.put(`/product/${id}`, formData);
//       return fulfilWithValue(
//         response.data.data,
//         dispatch(getProductDetail({ page: 1, name: "" }))
//       );
//     } catch (error) {
//       return rejectWithValue(error.error);
//     }
//   }
// );

// const productSlice = createSlice({
//   name: "product",
//   initialState: {
//     loading: false,
//     error: "",
//     productList: [],
//     totalPageNum: 1,
//     selectedProduct: null,
//   },
//   reducers: {
//     setSelectedProduct: (state, action) => {
//         state.selectedProduct = action.payload;
//     }
//   },
//   extraReducers: (builder) => {
//     builder.addCase(createProduct.pending, (state) => {
//         state.loading = true;
//     });
    
//     builder.addCase(createProduct.fulfilled, (state) => {
//         state.loading = false;
//         state.error = '';
//     });

//     builder.addCase(createProduct.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//     });

//     builder.addCase(getProductList.pending, (state) => {
//         state.loading = true;
//     });

//     builder.addCase(getProductList.fulfilled, (state, action)=> {
//         state.loading = false;
//         state.error = '';
//         state.selectedProduct = action.payload.data;
//         state.totalPageNum = action.payload.totalPageNum;
//     });

//     builder.addCase(getProductList.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//     });

//     builder.addCase(getProductDetail.pending, (state) => {
//         state.loading = true;
//     });

//     builder.addCase(getProductDetail.fulfilled, (state, action) => {
//         state.loading = false;
//         state.selectedProduct = action.payload;
//     });

//     builder.addCase(getProductDetail.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//     });

//     builder.addCase(editProduct.pending, (state) => {
//         state.loading = true;
//     });

//     builder.addCase(editProduct.fulfilled, (state, action) =>{
//         state.loading = false;
//         state.error = '';
//     });

//     builder.addCase(editProduct.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//     });

//     builder.addCase(deleteProduct.pending, (state,) => {
//         state.loading = false;
//     });

//     builder.addCase(deleteProduct.fulfilled, (state, action) => {
//         state.loading = false;
//         state.selectedProduct = action.payload;
//     });

//     builder.addCase(deleteProduct.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//     });
//   },
// });

// export const {setSelectedProduct} = productSlice.actions;
// export default productSlice.reducer;

import * as types from '../constants/product.constants';

const initialState = {
  loading: false,
  error: '',
  productList: [],
  totalPageNum: 1, 
  selectedProduct: null,
}

const productReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch(type) {
    case types.PRODUCT_CREATE_REQUEST:
    case types.PRODUCT_GET_REQUEST:
    case types.PRODUCT_EDIT_REQUEST:
    case types.GET_PRODUCT_DETAIL_REQUEST:
    case types.PRODUCT_CATEGORY_GET_REQUEST:
      return {...state, loading: true};
    case types.PRODUCT_CREATE_SUCCESS:
    case types.PRODUCT_EDIT_SUCCESS:
      return{...state, loading: false, error: ''};
    case types.PRODUCT_GET_SUCCESS:
    case types.PRODUCT_CATEGORY_GET_SUCCESS:
      return {...state, loading: false, error: '', productList: payload.data, totalPageNum: payload.totalPageNum};
    case types.GET_PRODUCT_DETAIL_SUCCESS:
      return {...state, loading: false, selectedProduct: payload};
    case types.PRODUCT_CREATE_FAIL:
    case types.PRODUCT_GET_FAIL:
    case types.PRODUCT_CATEGORY_GET_FAIL:
    case types.PRODUCT_EDIT_FAIL:  
    case types.GET_PRODUCT_DETAIL_FAIL:
      return {...state, loading: false, error: payload};
    case types.SET_SELECTED_PRODUCT:
      return {...state, selectedProduct: payload}
    default: return state;
  }
}

export default productReducer

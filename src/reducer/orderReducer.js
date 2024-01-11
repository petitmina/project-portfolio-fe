// import { createSlice } from "@reduxjs/toolkit";
// import { createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../utils/api";
// import cartReducer from "./cartReducer";

// export const createOrder = createAsyncThunk(
//   "order/createOrder",
//   async ({ payload, navigate }, { fulfillWithValue, rejectWithValue }) => {
//     try {
//       const response = await api.post("/order", payload);
//       fulfillWithValue(response.data.orderNum);
//       fulfillWithValue(cartReducer.getCartQty());
//     } catch (error) {
//       rejectWithValue(error.error);
//     }
//   }
// );

// const getOrder = createAsyncThunk(
//   "order/getOrder",
//   async (_, { fulfillWithValue, rejectWithValue }) => {
//     try {
//       const response = await api.get("/order/me");
//       return fulfillWithValue(response.data);
//     } catch (error) {
//       return rejectWithValue(error.error);
//     }
//   }
// );

// const getOrderList = createAsyncThunk(
//   "order/getOrderList",
//   async ({ query }, { fulfillWithValue, rejectWithValue }) => {
//     try {
//       const response = await api.get("/order", { params: { ...query } });
//       return fulfillWithValue(response.data);
//     } catch (error) {
//       return rejectWithValue(error.error);
//     }
//   }
// );

// const updateOrder = createAsyncThunk(
//   "order/updateOrder",
//   async ({ id, status }, { fulfillWithValue, rejectWithValue }) => {
//     try {
//       const response = await api.put(`/order/${id}`, { status });
//       fulfillWithValue(response.data);
//       fulfillWithValue(getOrderList());
//     } catch (error) {
//       return rejectWithValue(error.error);
//     }
//   }
// );

// const orderSlice = createSlice({
//   name: "order",
//   initialState: {
//     orderList: [],
//     orderNum: "",
//     selectedOrder: {},
//     error: "",
//     loading: "false",
//     totalPageNum: 1,
//   },
//   reducers: {
//     selectedOrder: (state, action) => {
//       state.selectedOrder = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(createOrder.pending, (state) => {
//       state.loading = true;
//     });

//     builder.addCase(createOrder.fulfilled, (state, action) => {
//       state.loading = false;
//       state.orderNum = action.payload;
//     });

//     builder.addCase(createOrder.rejected, (state) => {
//       state.loading = false;
//     });

//     builder.addCase(getOrder.pending, (state) => {
//       state.loading = true;
//     });

//     builder.addCase(getOrder.fulfilled, (state, action) => {
//       state.loading = false;
//       state.orderList = action.payload.data;
//       state.totalPageNum = action.payload.totalPageNum;
//     });

//     builder.addCase(getOrder.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     });

//     builder.addCase(getOrderList.pending, (state) => {
//       state.loading = true;
//     });

//     builder.addCase(getOrderList.fulfilled, (state, action) => {
//       state.loading = false;
//       state.orderList = action.payload.data;
//       state.totalPageNum = action.payload.totalPageNum;
//     });

//     builder.addCase(getOrderList.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     });

//     builder.addCase(updateOrder.pending, (state) => {
//         state.loading = true;
//     });

//     builder.addCase(updateOrder.fulfilled, (state, action) => {
//         state.loading = false;
//         //처리가 필요하면 업데이트 할것
//     });

//     builder.addCase(updateOrder.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//     })
//   },
// });


// export const {selectedOrder} = orderSlice.actions;
// export default orderSlice.reducer;

import * as types from '../constants/order.constants'

const initialState = {
  orderList: [],
  orderNum: '',
  selectedOrder: {},
  error: '',
  loading: false,
  totalPageNum: 1,
}

function orderReducer(state = initialState, action) {
  const{type, payload} = action;

  switch(type) {
    case types.CREATE_ORDER_REQUEST:
    case types.GET_ORDER_REQUEST:
    case types.GET_ORDER_LIST_REQUEST:
      return {...state, loading: true};
    case types.CREATE_ORDER_SUCCESS:
      return {...state, loading: false, orderNum: payload};
    case types.GET_ORDER_SUCCESS:
    case types.GET_ORDER_LIST_SUCCESS:
      return {...state, loading: false, orderList: payload.data, totalPageNum: payload.totalPageNum};
    case types.CREATE_ORDER_FAIL:
    case types.GET_ORDER_FAIL:
    case types.GET_ORDER_LIST_FAIL:
      return {...state, loading: false, error: payload};
    case types.SET_SELECTED_ORDER:
      return {...state, selectedOrder: payload};
    default:
      return state;
  }
}

export default orderReducer;
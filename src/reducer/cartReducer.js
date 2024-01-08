// import { createSlice } from "@reduxjs/toolkit";
// import { createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../utils/api";

// export const addToCart = createAsyncThunk(
//     'cart/addToCart',
//     async({id, color, qty}, {fulfilWithValue, rejectWithValue}) => {
//         try{
//             const response = await api.post('/cart', {productId: id, color, qty})
//             return fulfilWithValue(response.data.cartItemQty)
//         }catch(error) {
//             return rejectWithValue(error.error)
//         }
//     }
// );

// export const getCartList = createAsyncThunk(
//     'cart/getCartList',
//     async(_,{fulfilWithValue, rejectWithValue}) => {
//         try{
//             const response = await api.get('/cart');
//             return fulfilWithValue(response.data.data)
//         } catch(error){
//             return rejectWithValue(error.error)
//         }
//     }
// );

// export const deleteCartItem = createAsyncThunk(
//     'cart/deleteCartItem',
//     async({id}, {fulfilWithValue, rejectWithValue}) => {
//         try{
//             const response = await api.delete(`/cart/${id}`)
//             return fulfilWithValue(response.data.cartItemQty)
//         }catch(error) {
//             return rejectWithValue(error)
//         }
//     }
// );

// export const updateQty = createAsyncThunk(
//     'cart/updateQty',
//     async({id, value}, {fulfilWithValue, rejectWithValue}) =>{
//         try{
//             const response = await api.get(`/cart/${id}`, {qty: value});
//             return fulfilWithValue(response.data.data)
//         } catch(error){
//             return rejectWithValue(error)
//         }
//     }
// );

// export const getCartQty = createAsyncThunk(
//     'cart/getCartQty',
//     async(_, {fulfilWithValue, rejectWithValue})=>{
//        try{
//         const response = await api.get(`/cart/qty`);
//         return fulfilWithValue(response.data.qty)
//     } catch(error){
//         return rejectWithValue(error)
//     }
// }
// );

// const cartSlice = createSlice({
//     name: "cart",
//     initialState: {
//         loading: false,
//         error: '',
//         cartItemQty: 0,
//         cartList: [],
//         selectedItem: {},
//         totalPrice: 0,
//     },
//     reducers: {
//         cartLogout: (state) => {
//             state.loading = false;
//             state.error = '';
//             state.cartItemQty = 0;
//             state.cartList = [];
//             state.selectedItem = {};
//             state.totalPrice = 0;
//         }
//     },
//     extraReducers: (builder) => {
//         builder.addCase(addToCart.pending, (state) =>{
//             state.loading = true;
//         });

//         builder.addCase(addToCart.fulfilled, (state, action) => {
//             state.loading = false;
//             state.cartItemQty = action.payload;
//         });

//         builder.addCase(addToCart.rejected, (state, action) => {
//             state.loading = false;
//             state.error = action.payload;
//         });

//         builder.addCase(getCartList.pending, (state) => {
//             state.loading = true;
//         });

//         builder.addCase(getCartList.fulfilled,(state, action) => {
//             state.cartList = action.payload;
//             state.totalPrice = action.payload.reduce(
//                 (total, item) => (total += item.productId.price * item.qty),
//                 0
//             )
//         });

//         builder.addCase(getCartList.rejected, (state, action) => {
//             state.loading = false;
//             state.error = action.payload;
//         });

//         builder.addCase(deleteCartItem.pending, (state) =>{
//             state.loading = false;
//         });

//         builder.addCase(deleteCartItem.fulfilled, (state, action) => {
//             state.loading = false;
//             state.cartItemQty = action.payload;
//         });

//         builder.addCase(deleteCartItem.rejected, (state, action) => {
//             state.loading = false;
//             state.error = action.payload;
//         });

//         builder.addCase(updateQty.pending, (state)=>{
//             state.loading = true;
//         });

//         builder.addCase(updateQty.fulfilled, (state, action) => {
//             state.loading = false;
//             state.cartList = action.payload;
//             state.totalPrice = action.payload.reduce(
//                 (total, item) => (total += item.productId.price * item.qty),
//                 0
//             )
//         });

//         builder.addCase(updateQty.rejected, (state, action) => {
//             state.loading = false;
//             state.error = action.payload;
//         });

//         builder.addCase(getCartQty.pending, (state) => {
//             state.loading = true;
//         });

//         builder.addCase(getCartQty.fulfilled, (state, action) => {
//             state.loading = false;
//             state.cartItemQty = action.payload;
//         });

//         builder.addCase(getCartQty.rejected, (state, action) => {
//             state.loading = false;
//             state.error = action.payload;
//         })
//     }
// });

// export const {cartLogout} = cartSlice.actions;
// export default cartSlice.reducer;

import * as types from '../constants/cart.constants'

const initialState = {
    loading: false,
    error: '',
    cartItemQty: 0,
    cartList: [],
    selectedItem: {},
    totalPrice: 0,
}


const cartReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case types.ADD_TO_CART_REQUEST:
        case types.GET_CART_LIST_REQUEST:
        case types.DELETE_CART_ITEM_REQUEST:
        case types.UPDATE_CART_ITEM_REQUEST:
        case types.GET_CART_QTY_REQUEST:
            return {...state, loading: true};
        case types.ADD_TO_CART_SUCCESS:
        case types.DELETE_CART_ITEM_SUCCESS:
            return{...state, loading: false, cartItemQty: payload};
        case types.UPDATE_CART_ITEM_SUCCESS:
            return{
                ...state,
                loading: false,
                cartList: payload.reduce(
                    (total, item) => (total += item.productId.price * item.qty),
                    0
                )
            };
        case types.GET_CART_LIST_SUCCESS:
            return {
                ...state,
                cartList: payload,
                totalPrice: payload.reduce(
                    (total, item) => (total += item.productId.price * item.qty),
                    0
                ),
            };
        case types.GET_CART_QTY_SUCCESS:
            return { ...state, cartItemQty: payload};
        case types.ADD_TO_CART_FAIL:
        case types.GET_CART_LIST_FAIL:
        case types.DELETE_CART_ITEM_FAIL:
        case types.UPDATE_CART_ITEM_FAIL:
        case types.GET_CART_QTY_FAIL:
            return {...state, loading: false, error: payload};

        default: return state;
    }
}

export default cartReducer

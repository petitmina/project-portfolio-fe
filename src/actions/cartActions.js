import * as types from '../constants/cart.constants';
import api from '../utils/api';

// 상품디테일페이지에서 선택한 수량 설정을 해줘야할거같음...
const addToCart = ({id, color, qty}) => async(dispatch) => {
    try{
        dispatch({type: types.ADD_TO_CART_REQUEST});
        const response = await api.post('/cart', {productId: id, color, qty});
        if(response.status !== 200) throw new Error(response.error);
        dispatch({type: types.ADD_TO_CART_SUCCESS, payload: response.data.cartItemQty})
    } catch(error) {
        dispatch({type: types.ADD_TO_CART_FAIL, payload: error.error});
    }
};

const getCartList = () => async(dispatch) => {
    try{
        dispatch({ type: types.GET_CART_LIST_REQUEST});
        const response = await api.get('/cart');
        if(response.status !== 200) throw new Error(response.error);
        dispatch({ type: types.GET_CART_LIST_SUCCESS, payload: response.data.data});
    }catch(error) {
        dispatch({ type: types.GET_CART_LIST_FAIL, payload: error.error});
    }
};

const deleteCartItem = (id) => async(dispatch) => {
    try{
        dispatch({type: types.DELETE_CART_ITEM_REQUEST});
        const response = await api.put(`/cart/${id}`);
        if(response.status !== 200) throw new Error(response.data);
        dispatch({type: types.DELETE_CART_ITEM_SUCCESS, payload: response.data.cartItemQty});
        dispatch(getCartList());
    }catch(error) {
        dispatch({type: types.DELETE_CART_ITEM_FAIL, payload: error.error});
    }
};

const updateQty = (id, value) => async(dispatch) => {
    try{
        dispatch({type: types.UPDATE_CART_ITEM_REQUEST});
        const response = await api.put(`/cart/${id}`, {qty: value});
        if(response.status !== 200)throw new Error(response.error);
        dispatch({type: types.UPDATE_CART_ITEM_SUCCESS, payload: response.data.data});
    } catch(error) {
        dispatch({ type: types.UPDATE_CART_ITEM_FAIL, payload: error.error})
    }
};

const getCartQty = () => async(dispatch) => {
    try{
        dispatch({type: types.GET_CART_QTY_REQUEST});
        const response = await api.get('/cart/qty');
        if(response.status !== 200) throw new Error(response.error);
        dispatch({type: types.GET_CART_QTY_SUCCESS, payload: response.data.qty})
    } catch(error) {
        dispatch({ type: types.GET_CART_QTY_FAIL, payload: error.error})
    }
} 
export const cartActions = {
    addToCart,
    getCartList,
    deleteCartItem,
    updateQty,
    getCartQty,
}
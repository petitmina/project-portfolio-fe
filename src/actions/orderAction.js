import * as types from "../constants/order.constants";
import api from "../utils/api";
import { cartActions } from "./cartActions";

const createOrder = (payload, navigate) => async(dispatch) => {
    try{
        dispatch({type: types.CREATE_ORDER_REQUEST});
        const response = await api.post('/order', payload);
        if(response.status !== 200) throw new Error(response.error);
        dispatch({type: types.CREATE_ORDER_SUCCESS, payload: response.data.orderNum});
        dispatch(cartActions.getCartQty());
    }catch(error) {
        dispatch({type: types.CREATE_ORDER_FAIL, payload: error.error});
    }
};

const getOrder = () => async(dispatch) => {
    try{
        dispatch({type: types.GET_ORDER_REQUEST});
        const response = await api.get('/order/me');
        if(response.status !== 200) throw new Error(response.error);
        dispatch({type: types.GET_ORDER_SUCCESS, payload: response.data});
    }catch(error) {
        dispatch({type: types.GET_ORDER_FAIL, error: error});
    }
};

const getOrderList = (query) =>  async(dispatch) => {
    try{
        dispatch({type: types.GET_ORDER_LIST_REQUEST});
        const response = await api.get('/order', {
            params: {...query},
        });
        if(response.status !== 200) throw new Error(response.error);
        dispatch({ type: types.GET_ORDER_LIST_SUCCESS, payload: response.data});
    }catch(error) {
        dispatch({type: types.GET_ORDER_LIST_FAIL, payload: error.error});
    }
};

const updateOrder = (id, status) =>async (dispatch) => {
    try{
        dispatch({type: types.UPDATE_ORDER_REQUEST});
        const response = await api.put(`/order/${id}`, {status});
        if(response.status !== 200) throw new Error(response.error);
        dispatch({type: types.UPDATE_ORDER_SUCCESS, payload: response.data});
        dispatch(getOrderList());
    }catch(error) {
        dispatch({type: types.UPDATE_ORDER_FAIL, payload: error.error})
    }
};

export const orderActions = {
    createOrder,
    getOrder,
    getOrderList,
    updateOrder,
}
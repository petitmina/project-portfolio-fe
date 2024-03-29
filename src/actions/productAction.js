import * as types from '../constants/product.constants';
import api from '../utils/api';

const createProduct = (formData) => async(dispatch) => {
    try{
        dispatch({type: types.PRODUCT_CREATE_REQUEST});
        const response = await api.post('/product',formData);
        if(response.status !== 200) throw new Error(response.error);
        dispatch({type: types.PRODUCT_CREATE_SUCCESS});
    }catch(error) {
        dispatch({ type: types.GET_PRODUCT_DETAIL_FAIL, payload: error.error})
    }
};

const getProductList = (query) => async (dispatch) => {
    try{
      dispatch({type: types.PRODUCT_GET_REQUEST});
      const response = await api.get('/product', {
        params: {...query } //검색조건도 보낼 수 있음
      });
      if(response.status !== 200) throw new Error(response.error);
      dispatch({ type: types.PRODUCT_GET_SUCCESS, payload: response.data});
    } catch(error){
      dispatch({ type: types.PRODUCT_GET_FAIL, payload: error.error});
    }
  };

// 수정필요
  const getCategoryProductList = (query) => async (dispatch) => {
    try{
      dispatch({type: types.PRODUCT_CATEGORY_GET_REQUEST});
      const response = await api.get('/product/category', {
        params: {...query } 
      });
      if(response.status !== 200) throw new Error(response.error);
      dispatch({ type: types.PRODUCT_CATEGORY_GET_SUCCESS, payload: response.data});
    } catch(error){
      dispatch({ type: types.PRODUCT_CATEGORY_GET_FAIL, payload: error.error});
    }
  };

const getProductDetail = (id) => async(dispatch) => {
    try{
        dispatch({type: types.GET_PRODUCT_DETAIL_REQUEST});
        const response = await api.get(`/product/${id}`);
        if(response.status !== 200) throw new Error(response.error);
        dispatch({type: types.GET_PRODUCT_DETAIL_SUCCESS, payload: response.data.data});
    } catch(error) {
        dispatch({type: types.GET_PRODUCT_DETAIL_FAIL, payload: error.error});
    }
};

const editProduct = (formData, id) => async(dispatch) => {
    try{
        dispatch({type: types.PRODUCT_EDIT_REQUEST});
        const response = await api.put(`/product/${id}`, formData);
        if(response.status !== 200) throw new Error(response.error);
        dispatch({type: types.PRODUCT_EDIT_SUCCESS, payload: response.data.data});
        dispatch(getProductDetail({page:1, name: ''}));
    } catch(error) {
        dispatch({type: types.PRODUCT_EDIT_FAIL, payload: error.error});
    }
};

const deleteProduct = (id) => async(dispatch) => {
    try{
        dispatch({type: types.PRODUCT_DELETE_REQUEST});
        const response = await api.delete(`/product/${id}`);
        if(response.status !== 200) throw new Error(response.error);
        dispatch({type: types.PRODUCT_DELETE_SUCCESS});
        dispatch(getProductList({page: 1}))
    }catch(error) {
        dispatch({type: types.PRODUCT_DELETE_FAIL, payload: error.error})
    }
}

export const productActions ={
    createProduct,
    getProductList,
    editProduct,
    deleteProduct,
    getProductDetail,
    getCategoryProductList,
}
import * as types from '../constants/user.constants';
import api from '../utils/api';

const registerUser = ({email, name, password, level}, navigate) => async (dispatch) => {
    try{
        dispatch({type: types.REGISTER_USER_REQUEST})
        const response = await api.post('/user', {email, name, password, level});
        if(response.status !== 200) throw new Error(response.error);
        dispatch({ type: types.REGISTER_USER_SUCCESS});
        navigate('/login'); 
    }catch(error) {
        dispatch({ type: types.REGISTER_USER_FAIL, payload: error.error});
    }
};

const loginWithEmail = ({email, password}) => async(dispatch) => {
    try{
        dispatch({type: types.LOGIN_REQUEST});
        const response = await api.post('/auth/login', {email, password});
        if(response.status !== 200) throw new Error(response.error);
        sessionStorage.setItem('token', response.data.token);
        dispatch({type: types.LOGIN_SUCCESS, payload: response.data})
    } catch(error) {
        dispatch({type: types.LOGIN_FAIL, payload: error.error});
    }
};

const loginWithToken = () => async(dispatch) => {
    try{
        dispatch({type: types.LOGIN_WITH_TOKEN_REQUEST});
        const response = await api.get('/user/me');
        if(response.status !== 200) throw new Error(response.error);
        dispatch({type: types.LOGIN_WITH_TOKEN_SUCCESS, payload: response.data })
    } catch(error) {
        dispatch({type: types.LOGIN_WITH_TOKEN_FAIL, payload: error.error});
         dispatch(logout());
    }
};
const logout = () => async(dispatch) => {
    dispatch({type: types.LOGOUT});
    sessionStorage.removeItem('token');
}

export const userActions = {
    registerUser,
    loginWithEmail,
    loginWithToken,
    logout,
}
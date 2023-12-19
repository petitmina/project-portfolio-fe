// import { userActions } from "../reducer/userReducer";
// // import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
// import api from "../utils/api";



// const loginWithToken = () => async(dispatch)=> {
//   try{
//     dispatch(userActions.loginWithTokenRequest());
//     const response = await api.get('/user/me');
//     if(response.status !== 200) throw new Error(response.error);
//     console.log('rrr', response)
//     dispatch(userActions.loginWithTokenSuccess(response.data))
//   } catch(error) {
//     dispatch(userActions.loginWithTokenFail(error));
//     dispatch(userActions.logout());
//   }
// };

// const loginWithEmail = ({email, password}) => async(dispatch) => {
//   try{
//     dispatch(userActions.loginRequest());
//     const response = await api.post('/auth/login', {email, password});
//     if(response.status !== 200) throw new Error(response.error);
//     console.log('ttt', response)
//     sessionStorage.setItem('token', response.data.token);
//     dispatch(userActions.loginSuccess(response.data));
//   } catch(error) {
//     dispatch(userActions.loginFail(error.error));
//   }
// };

// const registerUser = ({ email, name, password }, navigate) => async(dispatch) => {
//   try{
//     dispatch(userActions.registerUserRequest());
//     const response = await api.post('/user', {email, name, password});
//     if(response.status !== 200) throw new Error(response.error);
//     console.log('sss', response)
//     dispatch(userActions.registerUserSuccess());
//     navigate('/login');
//   } catch(error) {
//     dispatch(userActions.registerUserFail(error.error));
//   }
// };

// const logout = () => async(dispatch) => {
//   dispatch(userActions.logout());
//   sessionStorage.removeItem('token');
// }

// export const userActionApi = {
//   registerUser,
//   loginWithToken,
//   loginWithEmail,
//   logout,
// }
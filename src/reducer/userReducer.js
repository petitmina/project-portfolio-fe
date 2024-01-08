// import { createSlice } from "@reduxjs/toolkit";
// import { createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../utils/api";

// export const loginWithToken = createAsyncThunk(
//   "user/loginWithToken",
//   async (_, { fulfillWithValue, rejectWithValue, dispatch }) => {
//     try {
//       const response = await api.get("/user/me");
//       console.log("333", response);
//       return fulfillWithValue(response.data);
//     } catch (error) {
//       console.error("qqq", error);
//       dispatch(logout());
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const loginWithEmail = createAsyncThunk(
//   "user/loginWithEmail",
//   async ({ email, password }, {fulfillWithValue, rejectWithValue }) => {
//     try {
//       const response = await api.post("/auth/login", { email, password });
//       console.log("111", response);
//       sessionStorage.setItem("token", response.data.token);
//       return fulfillWithValue(response.data);
//     } catch (error) {
//       console.error("sss", error);
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const logout = createAsyncThunk("user/logout", async () => {
//   sessionStorage.removeItem("token");
// });

// export const registerUser = createAsyncThunk(
//   "user/registerUser",
//   async ({ email, name, password, level }, { fulfillWithValue, rejectWithValue }) => {
//     try {
//       const response = await api.post("/user", { email, name, password, level });
//       console.log("222", response);
//       return fulfillWithValue(response.data);
//     } catch (error) {
//       console.error("ddd", error);
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// const userSlice = createSlice({
//   name: "user",
//   initialState: { loading: false, user: null, error: "" },
//   reducers: {
//     logout: (state) => {
//       state.loading = false;
//       state.user = null;
//     }
//   },
//   extraReducers: (builder) => {
//     builder.addCase(registerUser.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//     });

//     builder.addCase(registerUser.fulfilled, (state) => {
//       state.loading = false;
//       state.error = null;
//     });

//     builder.addCase(registerUser.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     });

//     builder.addCase(loginWithEmail.pending, (state) => {
//       state.loading = true;
//     });

//     builder.addCase(loginWithEmail.fulfilled, (state, action) => {
//       state.loading = false;
//       state.user = action.payload.user;
//     });

//     builder.addCase(loginWithEmail.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     });

//     builder.addCase(loginWithToken.pending, (state) => {
//       state.loading = true;
//     });

//     builder.addCase(loginWithToken.fulfilled, (state, action) => {
//       state.loading = false;
//       state.user = action.payload.user;
//     });

//     builder.addCase(loginWithToken.rejected, (state) => {
//       state.loading = false;
//     });

//   },
// });

// export default userSlice.reducer;
// 로그인시 토큰이 유지 되지않음


// import React from 'react'

import * as types from '../constants/user.constants';

const initialState = {
  loading: false,
  user: null,
  error: '',
};

const userReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch(type) {
    case types.REGISTER_USER_REQUEST:
    case types.LOGIN_REQUEST:
      return{...state, loading: true};
    case types.LOGIN_WITH_TOKEN_REQUEST:
      return{...state, loading: true};
    case types.LOGIN_SUCCESS:
    case types.LOGIN_WITH_TOKEN_SUCCESS:
      return {...state, loading: false, user: payload.user};
    case types.LOGIN_FAIL:
    case types.REGISTER_USER_FAIL:
      return {...state, loading: false, error: payload};
      case types.LOGIN_WITH_TOKEN_FAIL:
        return{...state, loading: false}
      case types.LOGOUT:
        return {...state, user: null};
    default: return state;
  }
}

export default userReducer

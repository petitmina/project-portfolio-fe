import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";

export const loginWithToken = createAsyncThunk(
  "user/loginWithToken",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await api.get("/user/me");
      console.log("333", response);
      return fulfillWithValue(response.data);
    } catch (error) {
      console.error("qqq", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginWithEmail = createAsyncThunk(
  "user/loginWithEmail",
  async ({ email, password }, {fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      console.log("111", response);
      sessionStorage.setItem("token", response.data.token);
      return fulfillWithValue(response.data);
    } catch (error) {
      console.error("sss", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk("user/logout", async () => {
  sessionStorage.removeItem("token");
});

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async ({ email, name, password, level }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await api.post("/user", { email, name, password, level });
      console.log("222", response);
      return fulfillWithValue(response.data);
    } catch (error) {
      console.error("ddd", error);
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: { loading: false, user: null, error: "" },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(registerUser.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });

    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(loginWithEmail.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loginWithEmail.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
    });

    builder.addCase(loginWithEmail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(loginWithToken.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loginWithToken.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
    });

    builder.addCase(loginWithToken.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
    });
  },
});

export default userSlice.reducer;

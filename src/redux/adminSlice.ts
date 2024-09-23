import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { baseUrl } from "@/utils/constants";
import axios from "axios";
import { AdminState } from "@/utils/adminTypes";
import adminBuilder from "./adminBuilder";

interface LoginData {
  email: string;
  password: string;
}

const initialState: AdminState = {
  value: 0,
  loading: false,
  error: null,
  token: null,
};

export const login = createAsyncThunk<string, LoginData>(
  "connect/loginAsync",
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(`${baseUrl}/auth/login/student`, data);
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    adminBuilder(builder);
  },
});

export const {} = adminSlice.actions;
export const selectCount = (state: RootState) => state.admin.value;
export default adminSlice.reducer;

export const handleLogin = (data: LoginData) => async (dispatch: any) => {
  try {
    await dispatch(login(data));
  } catch (error) {
    console.error("Login error:", error);
  }
};

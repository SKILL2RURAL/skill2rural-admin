import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { baseUrl } from "@/utils/constants";
import axios from "axios";
import { AdminState } from "@/utils/adminTypes";
import adminBuilder from "./adminBuilder";

const initialState: AdminState = {
  value: 0,
  loading: false,
  error: null,
};

export const loginAsync = createAsyncThunk(
  "connect/loginAsync",
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(`${baseUrl}/`, data);
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

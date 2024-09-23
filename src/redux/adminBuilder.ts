import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import { AdminState } from "@/utils/adminTypes";
import { dashboardAnalytics, login } from "./adminSlice";
import { toast } from "react-toastify";

const adminBuilder = (builder: ActionReducerMapBuilder<AdminState>) => {
  builder
    .addCase(login.pending, (state: any) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(login.fulfilled, (state: any, action: PayloadAction<any>) => {
      state.loading = false;
      toast.success(action?.payload?.message || "Login successful");
      state.token = action.payload.data.accessToken;
      state.error = null;
      state.user = action.payload.data.user;
      localStorage.setItem(`user`, JSON.stringify(action.payload.data.user));
      localStorage.setItem(`token`, action.payload.data.accessToken);
    })
    .addCase(login.rejected, (state: any, action: any) => {
      state.loading = false;
      toast.error(action?.payload || "An error occurred");
      console.log(action.payload);
      state.error = (action.payload as string) || "An error occurred";
    })

    .addCase(dashboardAnalytics.pending, (state: any) => {
      state.loading = true;
    })
    .addCase(
      dashboardAnalytics.fulfilled,
      (state: any, action: PayloadAction<any>) => {
        state.loading = false;
        state.analytics = action.payload;
      }
    )
    .addCase(dashboardAnalytics.rejected, (state: any, action: any) => {
      state.loading = false;
      console.log(action);
    });

  return builder;
};

export default adminBuilder;

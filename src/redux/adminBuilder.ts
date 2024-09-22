import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import { loginAsync } from "./adminSlice";
import { AdminState } from "@/utils/adminTypes";

const adminBuilder = (builder: ActionReducerMapBuilder<AdminState>) => {
  builder
    .addCase(loginAsync.pending, (state: any) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(loginAsync.fulfilled, (state: any, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = null;
    })
    .addCase(loginAsync.rejected, (state: any, action: any) => {
      state.loading = false;
      state.error = (action.payload as string) || "An error occurred";
    });

  return builder;
};

export default adminBuilder;

import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import { AdminState } from "@/utils/adminTypes";
import {
  dashboardAnalytics,
  getAllCourses,
  getAllUsers,
  getCourseDetails,
  getCoursesStats,
  getUser,
  getUserCourses,
  getUserStats,
  login,
} from "./adminSlice";
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
      console.error(action.payload);
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
      console.error(action);
    })

    .addCase(
      getAllUsers.fulfilled,
      (state: any, action: PayloadAction<any>) => {
        state.loading = false;
        state.allUsers = action.payload;
      }
    )
    .addCase(
      getAllCourses.fulfilled,
      (state: any, action: PayloadAction<any>) => {
        state.loading = false;
        state.allCourses = action.payload.data;
      }
    )
    .addCase(
      getCourseDetails.fulfilled,
      (state: any, action: PayloadAction<any>) => {
        state.loading = false;
        state.courseDetails = action.payload.data;
      }
    )
    .addCase(
      getUserStats.fulfilled,
      (state: any, action: PayloadAction<any>) => {
        state.loading = false;
        state.userStats = action.payload;
      }
    )
    .addCase(getUser.fulfilled, (state: any, action: PayloadAction<any>) => {
      state.loading = false;
      state.singleUser = action.payload;
    })
    .addCase(
      getUserCourses.fulfilled,
      (state: any, action: PayloadAction<any>) => {
        state.loading = false;
        state.userCourses = action.payload;
      }
    )
    .addCase(
      getCoursesStats.fulfilled,
      (state: any, action: PayloadAction<any>) => {
        state.loading = false;
        state.coursesStats = action.payload;
      }
    );

  return builder;
};

export default adminBuilder;

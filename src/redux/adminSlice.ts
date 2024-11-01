import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { baseUrl } from "@/utils/constants";
import axios from "axios";
import {
  AdminState,
  CourseObj,
  PasswordChangeObj,
  userCoursesObj,
} from "@/utils/adminTypes";
import adminBuilder from "./adminBuilder";
import { type } from "os";

interface LoginData {
  email: string;
  password: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  type: string;
  organisation: string;
  role: string;
  no_of_students_to_reach: number;
  work_with_maginalized_populations: boolean;
  profile_photo: string;
  createdAt: string;
  updatedAt: string;
}

interface UserDetailsResponse {
  user: User;
  totalCertificates: number;
  quizesByUser: number;
  quizSuccessRate: number;
  totalCoursesTakenByUser: number;
  totalCourseCompletedbyUser: number;
  percentageCompleted: number;
}

const initialState: AdminState = {
  value: 0,
  loading: false,
  error: null,
  token: null,
  user: null,
  analytics: null,
  allUsers: null,
  allCourses: null,
  courseDetails: null,
  userStats: null,
  singleUser: null,
  userCourses: null,
  coursesStats: null,
  courseQuestions: null,
};

// Auth Enpoints
export const login = createAsyncThunk<string, LoginData>(
  "login",
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(`${baseUrl}/admin/login`, data);
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

// Analytics Endpoint

export const dashboardAnalytics = createAsyncThunk(
  "dashboardAnalytics",
  async (_, thunkAPI) => {
    const token = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : null;

    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }
    thunkAPI.dispatch(setToken(token));
    try {
      const res = await axios.get(`${baseUrl}/admin/dashboard-analytics`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

// Courses Endpoints
export const getCoursesStats = createAsyncThunk(
  "getCoursesStats",
  async (_, thunkAPI) => {
    const token = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : null;

    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }
    try {
      const res = await axios.get(
        `${baseUrl}/admin/course/dashboard-analytics`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

export const getAllCourses = createAsyncThunk(
  "getAllCourses",
  async (
    {
      search,
      status,
      type,
      page,
    }: { search?: string; status?: string; type?: string; page?: number | 1 },
    thunkAPI
  ) => {
    const token = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : null;

    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }
    try {
      const queryParams = [];
      if (search) queryParams.push(`search=${search}`);
      if (status) queryParams.push(`status=${status}`);
      if (type) queryParams.push(`userType=${type}`);
      if (page) queryParams.push(`page=${page}`);
      const queryString = queryParams.length ? `${queryParams.join("&")}` : "";
      const res = await axios.get(
        `${baseUrl}/admin/course?${queryString}&pageSize=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

export const getCourseDetails = createAsyncThunk<CourseObj, string>(
  "getCourseDetails",
  async (id, thunkAPI) => {
    const token = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : null;

    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }
    try {
      const res = await axios.get<CourseObj>(`${baseUrl}/course/public/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

// Users Endpoints
export const getUser = createAsyncThunk<UserDetailsResponse, string>(
  "getUser",
  async (id, thunkAPI) => {
    const token = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : null;

    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }
    try {
      const res = await axios.get<UserDetailsResponse>(
        `${baseUrl}/admin/user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "getAllUsers",
  async (
    {
      search,
      status,
      type,
      page,
    }: { search?: string; status?: string; type?: string; page?: number | 1 },
    thunkAPI
  ) => {
    const token = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : null;

    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }
    try {
      const queryParams = [];
      if (search) queryParams.push(`search=${search}`);
      if (status) queryParams.push(`status=${status}`);
      if (type) queryParams.push(`userType=${type}`);
      if (page) queryParams.push(`page=${page}`);
      const queryString = queryParams.length ? `${queryParams.join("&")}` : "";
      const res = await axios.get(
        `${baseUrl}/admin/users?${queryString}&pageSize=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

export const getUserStats = createAsyncThunk(
  "getUserStats",
  async (_, thunkAPI) => {
    const token = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : null;

    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }
    try {
      const res = await axios.get(`${baseUrl}/admin/users-stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

export const getUserCourses = createAsyncThunk<userCoursesObj, string>(
  "getUserCourses",
  async (id, thunkAPI) => {
    const token = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : null;

    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }
    try {
      const res = await axios.get<userCoursesObj>(
        `${baseUrl}/admin/user/${id}/courses`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

interface PasswordChangeResponse {
  message: string;
}

export const changePassword = createAsyncThunk<
  PasswordChangeResponse,
  PasswordChangeObj,
  { rejectValue: string }
>("changePassword", async (payload, thunkAPI) => {
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : null;

  if (!token) {
    return thunkAPI.rejectWithValue("No token found");
  }
  try {
    const res = await axios.patch<PasswordChangeResponse>(
      `${baseUrl}/user/change-password`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "An error occurred"
    );
  }
});

export const addNewCourse = createAsyncThunk<
  PasswordChangeResponse,
  CourseObj,
  { rejectValue: string }
>("addNewCourse", async (payload, thunkAPI) => {
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : null;

  if (!token) {
    return thunkAPI.rejectWithValue("No token found");
  }
  try {
    const res = await axios.post<PasswordChangeResponse>(
      `${baseUrl}/course`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "An error occurred"
    );
  }
});

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setCourseQuestions: (state, action) => {
      state.courseQuestions = action.payload;
    },
    setAllUser: (state, action) => {
      state.allUsers = action.payload;
    },
  },
  extraReducers: (builder) => {
    adminBuilder(builder);
  },
});

export const { setUser, setToken, setCourseQuestions, setAllUser } =
  adminSlice.actions;

export default adminSlice.reducer;

export const handleLogin = (data: LoginData) => async (dispatch: any) => {
  try {
    await dispatch(login(data));
  } catch (error) {
    console.error("Login error:", error);
  }
};

export const getSingleUserDetails = (id: string) => async (dispatch: any) => {
  try {
    await dispatch(getUser(id));
  } catch (error) {
    console.error("error", error);
  }
};

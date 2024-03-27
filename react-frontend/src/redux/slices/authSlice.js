import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    loading: false,
    error: null,
};

export const fetchMe = createAsyncThunk(
    'auth/fetchMe',
    async () => {
        try {
            const response = await axios.get("/me");
            return response.data;
        } catch (error) {
            throw new Error(error);
        }
    }
);

export const setUser = createAsyncThunk(
    'auth/setUser',
    async (payload) => {
        try {
            const response = await axios.post("/login", payload);
            return response.data;
        } catch (error) {
            throw new Error(error);
        }
    }
);

export const clearUser = createAsyncThunk(
    'auth/clearUser',
    async () => {
        try {
            const response = await axios.delete("/logout");
            return response.data;
        } catch (error) {
            throw new Error(error);
        }
    }
);

export const addUserToApi = createAsyncThunk(
    'auth/addUserToApi',
    async (payload) => {
        try {
            const response = await axios.post("/signup", payload);
            return response.data;
        } catch (error) {
            throw new Error(error);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchMe.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchMe.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload;
        })
        .addCase(fetchMe.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(setUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(setUser.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload;
        })
        .addCase(setUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(clearUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(clearUser.fulfilled, (state) => {
          state.loading = false;
          state.user = null;
        })
        .addCase(clearUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(addUserToApi.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(addUserToApi.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload;
        })
        .addCase(addUserToApi.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
  });

  export const authReducer = authSlice.reducer;
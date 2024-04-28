import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async () => {
    try {
      const response = await fetch(`/users`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchUserByUsername = createAsyncThunk(
  "users/fetchUserById",
  async (username) => {
    try {
      const response = await fetch(`/users/${username}`);
      const data = await response.json();
      console.log("data from fetchUserbyUsername", data);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

// export const updateUserInApi = createAsyncThunk(
//   "user/updateUserInApi",
//   async ({ userId, updatedUser }) => {
//     const response = await fetch(`/users/${userId}`, {
//       method: "PATCH",
//       body: updatedUser,
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(errorText || "Update user failed");
//     }

//     const updatedUserData = await response.json();
//     return updatedUserData;
//   }
// );

export const updateUserInApi = createAsyncThunk(
  "user/updateUserInApi",
  async ({ userId, updatedUserData }) => {
    const response = await fetch(`/users/${userId}`, {
      method: "PATCH",
      body: updatedUserData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Update user failed");
    }

    const updatedUserDataResponse = await response.json();
    return updatedUserDataResponse;
  }
);

export const deleteUserFromApi = createAsyncThunk(
  "users/deleteUserFromApi",
  async (user) => {
    try {
      const response = await fetch(`/users/${user.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log("User deleted successfully.");
        return user.id;
      } else {
        throw new Error(`Failed to delete user: ${response.status}`);
      }
    } catch (error) {
      throw error;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    allUsers: [],
    individualUser: null,
    loggedInUser: null,
    loggedIn: null,
    loadingAllUsers: false,
    loadingIndividualUser: false,
    errorAllUsers: null,
    errorIndividualUser: null,
    loading: null,
    error: null,
    pending: null,
  },
  reducers: {
    resetUser: (state) => {
      state.individualUser = null;
    },
    addUser: (state, action) => {
      state.allUsers.push(action.payload);
    },
    updateUser: (state, action) => {
      const { id, updates } = action.payload;
      state.allUsers = state.allUsers.map((user) => {
        if (user.id === id) {
          return { ...user, ...updates };
        }
        return user;
      });
    },
    deleteUser: (state, action) => {
      state.allUsers = state.allUsers.filter(
        (user) => user.id !== action.payload.id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state, action) => {
        state.loadingAllUsers = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.allUsers = action.payload;
        state.loadingAllUsers = false;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loadingAllUsers = false;
        state.errorAllUsers = action.error.message;
      })
      .addCase(fetchUserById.pending, (state, action) => {
        state.loadingIndividualUser = true;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.individualUser = action.payload;
        state.loadingIndividualUser = false;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loadingIndividualUser = false;
        state.errorIndividualUser = action.error.message;
      })
      .addCase(updateUserInApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserInApi.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedInUser = action.payload;
        state.success = true;
      })
      .addCase(updateUserInApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteUserFromApi.fulfilled, (state, action) => {
        const deletedUserId = action.payload;

        state.allUsers = state.allUsers.filter(
          (user) => user.id !== deletedUserId
        );

        if (state.loggedInUser?.id === deletedUserId) {
          state.loggedInUser = null;
          state.loggedIn = null;
        }
      })
      .addCase(deleteUserFromApi.rejected, (state, action) => {
        console.log("There was a problem with deleteUserFromApi");
      });
  },
});

export const { resetUser, addUser, updateUser, deleteUser } = userSlice.actions;

export const userReducer = userSlice.reducer;

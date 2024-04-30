import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch item requests for a user
export const fetchItemRequests = createAsyncThunk(
  "itemRequests/fetchItemRequests",
  async (userId) => {
    const response = await axios.get(`/users/${userId}/item_requests`);
    return response.data;
  }
);

// Async thunk to add an item request for a user
export const addItemRequest = createAsyncThunk(
  "itemRequests/addItemRequest",
  async ({ userId, itemId }) => {
    const response = await axios.post(`/users/${userId}/item_requests`, {
      item_id: itemId,
    });
    return response.data;
  }
);

// Async thunk to remove an item request for a user
export const removeItemRequest = createAsyncThunk(
  "itemRequests/removeItemRequest",
  async ({ userId, itemRequestId }) => {
    await axios.delete(`/users/${userId}/item_requests/${itemRequestId}`);
    return itemRequestId;
  }
);

// need to remove itemRequest from the user

const itemRequestsSlice = createSlice({
  name: "itemRequests",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItemRequests.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addItemRequest.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(removeItemRequest.fulfilled, (state, action) => {
        const itemRequestId = action.payload;
        console.log("removeItemRequest ran")
        return state.filter((itemRequest) => itemRequest.id !== itemRequestId);
      });
  },
});

export default itemRequestsSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  consumerId: null,
  subscriptions: [],
};

const cableSlice = createSlice({
  name: 'cable',
  initialState,
  reducers: {
    initializeConsumer(state, action) {
      state.consumerId = action.payload;
    },
    addSubscription(state, action) {
      state.subscriptions.push(action.payload);
    },
    removeSubscription(state, action) {
      state.subscriptions = state.subscriptions.filter(sub => sub !== action.payload);
    }
  },
});

export const { initializeConsumer, addSubscription, removeSubscription } = cableSlice.actions;

export const cableReducer = cableSlice.reducer;
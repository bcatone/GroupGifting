import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  consumer: null,
  subscriptions: [],
};

const cableSlice = createSlice({
  name: 'cable',
  initialState,
  reducers: {
    initializeConsumer(state, action) {
      state.consumer = action.payload;
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

export default cableSlice.reducer;
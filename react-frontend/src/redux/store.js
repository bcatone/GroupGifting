import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootreducer";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { createConsumer } from "@rails/actioncable";
import { initializeConsumer } from "./slices/cableSlice";


const initializeConsumerMiddleware = (store) => (next) => (action) => {
    if (action.type === initializeConsumer.type) {
      const { consumerId } = action.payload;
      const consumer = createConsumer("ws://localhost:3000/cable");
      store.dispatch(initializeConsumer(consumerId));
    }
    return next(action);
  };

const persistConfig = {
  timeout: 100,
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      devTools: true,
    }),
    initializeConsumerMiddleware,
});

export const persistor = persistStore(store);

const consumerId = "some_unique_identifier";
const consumer = createConsumer("ws://localhost:3000/cable");
store.dispatch(initializeConsumer({ consumerId }));

export default store;

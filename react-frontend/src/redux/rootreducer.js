import { combineReducers } from "redux";
import authReducer from "./reducers/authReducer";
import settingsReducer from "./reducers/settingsReducer";
import { itemReducer } from "./slices/itemSlice";
import { commentReducer } from "./slices/commentSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  settings: settingsReducer,
  item: itemReducer,
  comment: commentReducer,
});

export default rootReducer;

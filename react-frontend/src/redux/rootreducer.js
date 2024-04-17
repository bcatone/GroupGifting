import { combineReducers } from "redux";
import { authReducer } from "./slices/authSlice";
import { cableReducer } from "./slices/cableSlice";
import { itemReducer } from "./slices/itemSlice";
import { directMessageReducer } from "./slices/directMessageSlice";
import { commentReducer } from "./slices/commentSlice";


const rootReducer = combineReducers({
  auth: authReducer,
  cable: cableReducer,
  item: itemReducer,
  directMessages: directMessageReducer,
  comment: commentReducer,
});

export default rootReducer;

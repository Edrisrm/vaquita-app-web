import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { inventoryReducer } from "./inventoryReducer";
export const rootReducer = combineReducers({
  auth: authReducer,
  inventory: inventoryReducer,
});

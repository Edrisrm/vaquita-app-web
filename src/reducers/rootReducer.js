import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { inventoryReducer } from "./inventoryReducer";
import { uiReducer } from "./uiReducer";
export const rootReducer = combineReducers({
  ui: uiReducer,
  auth: authReducer,
  inventory: inventoryReducer,
});
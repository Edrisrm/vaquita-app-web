import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { inventoryReducer } from "./inventoryReducer";
import {apartReducer} from './apartReducer';
import {recordReducer} from './recordsReducer'
import { uiReducer } from "./uiReducer";
export const rootReducer = combineReducers({
  ui: uiReducer,
  auth: authReducer,
  inventory: inventoryReducer,
  apart: apartReducer,
  records: recordReducer,
});
import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import currenInventoriesReducer from './inventariosVigentesReducer';
export const rootReducer = combineReducers({
    auth: authReducer,
    inventories: currenInventoriesReducer,
});
import { combineReducers } from 'redux';
import inventariosVigentesReducer from './inventariosVigentesReducer';
 export default combineReducers({
    inventarios: inventariosVigentesReducer,
 })
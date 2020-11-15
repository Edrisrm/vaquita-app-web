import {types} from '../types/types';

const initialState = {
    inventories: [],
    error: null,
    loading: false,
}
// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action){
    switch (action.type) {
        case types.ADD_INVENTORIE:
            return {
                ...state,
                loading: action.payload,
            }
        case types.ADD_INVENTORIE_SUCCESS:
            return{
                ...state,
                loading: false,
                inventories: [...state.inventories, action.payload]
            }
        case types.ADD_INVENTORIE_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}
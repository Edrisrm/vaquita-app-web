import { types } from "../types/types";

const initialState = {
    apart: [],
    currentApart: null,
    loading: false,
};

export const apartReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_NEW_APART:
            return{
                ...state,
                loading: action.payload,
            }            
        case types.ADD_APART_SUCCESS:
            return{
                ...state,
                apart: [...state.apart, action.payload],
            }
        case types.ADD_APART_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload,
            }
        case types.APART_LOADED:
            return{
                ...state,
                apart: [...action.payload],
            }
        case types.APART_SET_ACTIVE:
            return{
                ...state,
                currentApart: action.payload,
            }
        case types.APART_CLEAR_ACTIVE:
            return{
                ...state,
                currentApart: null,
            }
        case types.APART_DELETE_SUCCESS:
            return{
                ...state,
                apart: state.apart.filter(
                    (e) => e._id !== state.activeEvent._id
                ),
                currentApart: null,
            }
        default:
            return state;
    }
};
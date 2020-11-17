import { types } from "../types/types";

const initialState = {
    records: [],
    currentRecords: null,
    loading: false,
};
export const recordReducer = (state = initialState, action) =>{
    switch (action.type) {
        case types.RECORDS_LOADED:
            return{
                ...state,
                records: [...action.payload],
            }
    
        default:
            return state;
    }
}

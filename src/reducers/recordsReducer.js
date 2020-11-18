import { types } from "../types/types";

const initialState = {
    records: [],
    currentRecords: null,
    loading: false,
    count: 0,
};
export const recordReducer = (state = initialState, action) =>{
    switch (action.type) {
        case types.RECORDS_LOADED:
            return{
                ...state,
                records: [...action.payload.data],
                count: action.payload.count
            }
    
        default:
            return state;
    }
}

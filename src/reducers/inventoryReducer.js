import { types } from "../types/types";

const initialState = {
  inventory: [],
  currentInventory: null,
  loading: false,
};

export const inventoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_NEW_INVENTORY:
      return {
        ...state,
        loading: action.payload,
      };

    case types.ADD_INVENTORY_SUCCESS:
      return {
        ...state,
        inventory: [...state.inventory, action.payload],
      };

    case types.LOAD_INVENTORY:
      return {
        ...state,
        inventory: [...action.payload],
      };

    case types.ADD_INVENTORY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

import { types } from "../types/types";

const initialState = {
  inventory: [],
  updateDeleteManyInventory: [],
  currentInventory: null,
  loading: false,
  count: 0,
};

export const inventoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_NEW_INVENTORY:
      return {
        ...state,
        loading: action.payload,
      };

    case types.INVENTORY_LOADED:
      return {
        ...state,
        inventory: [...action.payload.data],
        count: action.payload.count,
      };
    case types.ADD_INVENTORY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.INVENTORY_UPDATE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.INVENTORY_SET_ACTIVE:
      return {
        ...state,
        currentInventory: action.payload,
      };

    case types.INVENTORY_CLEAR_ACTIVE:
      return {
        ...state,
        currentInventory: null,
      };

    case types.UPDATE_DELETE_INVENTORY_CLEAR:
      return {
        ...state,
        updateDeleteManyInventory: [],
      };

    case types.INVENTORY_UPDATED:
      return {
        ...state,
        inventory: state.inventory.map((e) =>
          e._id === action.payload._id ? action.payload : e
        ),
      };

    case types.INVENTORY_DELETED:
      return {
        ...state,
        inventory: state.inventory.filter(
          (e) => e._id !== state.currentInventory._id
        ),
        currentInventory: null,
      };

    case types.UPDATE_DELETE_INVENTORY_ADDED:
      return {
        ...state,
        updateDeleteManyInventory: [
          ...state.updateDeleteManyInventory,
          action.payload,
        ],
      };

    case types.UPDATE_DELETE_INVENTORY_DELETED:
      return {
        ...state,
        updateDeleteManyInventory: state.updateDeleteManyInventory.filter(
          (e) => e._id !== state.currentInventory._id
        ),
        currentInventory: null,
      };

    case types.INVENTORY_LOGOUT:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

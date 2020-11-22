import { inventoryReducer } from "../../reducers/inventoryReducer";
import { types } from "../../types/types";

const initState = {
  inventory: [],
  updateDeleteManyInventory: [],
  currentInventory: null,
  loading: false,
  count: 0,
};

describe("Pruebas en inventoryReducer.js", () => {
  test("debe de retornar el estado por defecto", () => {
    const action = {};
    const state = inventoryReducer(initState, action);

    expect(state).toEqual(initState);
  });

  test("debe de rellenar el currentInventory", () => {
    const action = {
      type: types.INVENTORY_SET_ACTIVE,
      payload: { _id: 423424 },
    };

    const state = inventoryReducer(initState, action);

    expect(state).toEqual({
      count: 0,
      currentInventory: { _id: 423424 },
      inventory: [],
      loading: false,
      updateDeleteManyInventory: [],
    });
  });
});

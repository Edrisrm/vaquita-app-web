import { types } from "../types/types";
import { fetchConsult } from "../helpers/fetchService";
import { loadingInventory } from "../helpers/loadingInventory";

import swal from "sweetalert2";
import moment from "moment";

export function storeInventories(inventory) {
  return async (dispatch) => {
    const resp = await fetchConsult("registro-inventario", inventory, "POST");
    const body = await resp.json();
    dispatch(addNewInventory());

    if (body.status === "success") {
      dispatch(addInventorySuccess(inventory));
      swal.fire({
        icon: "success",
        title: body.msg,
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      dispatch(addInventoryError(true));
      swal.fire("Error", body.msg, "error");
    }
  };
}

export const inventoryStartLoading = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchConsult("inventario-en-finca");
      const body = await resp.json();

      const inventory = loadingInventory(body.inventory);

      inventory.map((e) => ({
        ...e,

        date: moment(e.date).toDate(),
      }));

      dispatch(inventoryLoaded(inventory));
    } catch (error) {
      console.log(error);
    }
  };
};

const addNewInventory = () => ({
  type: types.ADD_NEW_INVENTORY,
  payload: true,
});
const addInventorySuccess = (inventory) => ({
  type: types.ADD_INVENTORY_SUCCESS,
  payload: inventory,
});

const inventoryLoaded = (inventory) => ({
  type: types.LOAD_INVENTORY,
  payload: inventory,
});

const addInventoryError = (state) => ({
  type: types.ADD_INVENTORY_ERROR,
  payload: state,
});

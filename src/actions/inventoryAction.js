import { types } from "../types/types";
import { fetchConsult } from "../helpers/fetchService";

import swal from "sweetalert2";

export function storeInventory(inventory) {
  return async (dispatch) => {
    const resp = await fetchConsult("agregar-inventario", inventory, "POST");
    const body = await resp.json();
    dispatch(addNewInventory());

    if (body.status === "success") {
      dispatch(addInventorySuccess(body.inventory));
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

export const inventoryStartLoading = (page_) => {
  return async (dispatch) => {
    try {
      const resp = await fetchConsult(`inventario-en-finca/${page_}`);

      const body = await resp.json();
      if (body.status === "success") {
        const inventory = body.data;

        dispatch(inventoryLoaded(inventory));
      } else {
        swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteOneInventory = (id) => {
  return async (dispatch) => {
    try {
      const resp = await fetchConsult(
        "borrar-inventario",
        { id: id },
        "DELETE"
      );
      const body = await resp.json();

      if (body.status === "success") {
        dispatch(deleteOneInventorySuccess());
        swal.fire("Eliminado", body.msg, "success");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const deleteOneInventorySuccess = () => ({
  type: types.INVENTORY_DELETED,
});
export const inventorySetActive = (inventory) => ({
  type: types.INVENTORY_SET_ACTIVE,
  payload: inventory,
});
export const inventoryClearActive = () => ({
  type: types.INVENTORY_CLEAR_ACTIVE,
});
const addNewInventory = () => ({
  type: types.ADD_NEW_INVENTORY,
  payload: true,
});
const addInventorySuccess = (inventory) => ({
  type: types.ADD_INVENTORY_SUCCESS,
  payload: inventory,
});
const inventoryLoaded = (inventory) => ({
  type: types.INVENTORY_LOADED,
  payload: inventory,
});

const addInventoryError = (state) => ({
  type: types.ADD_INVENTORY_ERROR,
  payload: state,
});

import { types } from "../types/types";
import { fetchConsult, uploadImageInventory } from "../helpers/fetchService";
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
      if (inventory.photo) {
        dispatch(uploadImage(inventory.photo, body.inventory._id));
      } else {
        dispatch(inventoryStartLoading());
      }
      dispatch(inventoryClearActive());
    } else {
      dispatch(addInventoryError(true));
      swal.fire("Error", body.msg, "error");
    }
  };
}
export function editOneInventory(inventory) {
  return async (dispatch) => {
    const resp = await fetchConsult("editar-inventario", inventory, "PUT");
    const body = await resp.json();

    if (body.status === "success") {
      dispatch(editInventorySuccess(body.inventory));
      swal.fire({
        icon: "success",
        title: body.msg,
        showConfirmButton: false,
        timer: 2000,
      });
      if (inventory.photo) {
        dispatch(uploadImage(inventory.photo, body.inventory._id));
      } else {
        dispatch(inventoryStartLoading());
      }
      dispatch(inventoryClearActive());
    } else {
      dispatch(editInventoryError(true));
      swal.fire("Error", body.msg, "error");
    }
  };
}
export const inventoryStartLoading = (page_) => {
  return async (dispatch) => {
    try {
      const resp = await fetchConsult(`inventario-en-finca/${page_}`, null);

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

        dispatch(inventoryStartLoading());
      } else {
        swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateBulk = (data) => {
  return async (dispatch) => {
    try {
      const resp = await fetchConsult(
        "actualizar-estado",
        { data: data },
        "PUT"
      );
      const body = await resp.json();
      if (body.status === "success") {
        swal.fire("Actualizado", body.msg, "success");
        dispatch(inventoryStartLoading());
        dispatch(addNewInventoryClear());
      } else {
        swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteBulk = (data) => {
  return async (dispatch) => {
    try {
      const resp = await fetchConsult(
        "eliminar-registros",
        { data: data },
        "DELETE"
      );
      const body = await resp.json();
      if (body.status === "success") {
        swal.fire("Eliminados", body.msg, "success");
        dispatch(inventoryStartLoading());
        dispatch(addNewInventoryClear());
      } else {
        swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const uploadImage = (file0, inventoryId) => {
  return async (dispatch) => {
    try {
      let formData = new FormData();

      formData.append("file0", file0);

      const resp = await uploadImageInventory(
        `upload-inventory/${inventoryId}`,
        formData
      );
      const body = await resp.json();

      if (body.status === "success") {
        dispatch(uploadImageInventorySuccess());
        dispatch(inventoryStartLoading());
      } else {
        dispatch(uploadImageInventoryError());
        swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addInNewInventory = (inventory) => {
  return async (dispatch) => {
    dispatch(addInNewInventoryAction(inventory));
  };
};

export const deleteInNewInventory = () => {
  return async (dispatch) => {
    dispatch(deleteInNewInventoryAction());
  };
};

export const addInNewInventoryAction = (inventory) => ({
  type: types.UPDATE_DELETE_INVENTORY_ADDED,
  payload: inventory,
});

export const deleteInNewInventoryAction = () => ({
  type: types.UPDATE_DELETE_INVENTORY_DELETED,
});

export const editInventorySuccess = (inventory) => ({
  type: types.INVENTORY_UPDATED,
  payload: inventory,
});
export const editInventoryError = (state) => ({
  type: types.INVENTORY_UPDATE_ERROR,
  payload: state,
});
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
const addInventorySuccess = () => ({
  type: types.ADD_INVENTORY_SUCCESS,
});

const uploadImageInventorySuccess = () => ({
  type: types.INVENTORY_IMAGE_UPLOADED,
});

const addNewInventoryClear = () => ({
  type: types.UPDATE_DELETE_INVENTORY_CLEAR,
});

const uploadImageInventoryError = () => ({
  type: types.INVENTORY_IMAGE_UPLOAD_ERROR,
});
const inventoryLoaded = (inventory) => ({
  type: types.INVENTORY_LOADED,
  payload: inventory,
});

const addInventoryError = (state) => ({
  type: types.ADD_INVENTORY_ERROR,
  payload: state,
});

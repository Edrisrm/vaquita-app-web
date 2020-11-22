import { types } from "../types/types";
import { fetchConsult } from "../helpers/fetchService";

import swal from "sweetalert2";

export function storeApart(apart) {
  return async (dispatch) => {
    const resp = await fetchConsult("agregar-apartado", apart, "POST");
    const body = await resp.json();
    dispatch(addNewApart());

    if (body.status === "success") {
      dispatch(addApartSuccess(body.apart));
      swal.fire({
        icon: "success",
        title: body.msg,
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      dispatch(addApartError(true));
      swal.fire("Error", body.msg, "error");
    }
  };
}
export const apartStartLoading = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchConsult("apartos");
      const body = await resp.json();
      if (body.status === "success") {
        dispatch(apartLoaded(body.aparts));
      } else {
        swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteApart = (id) => {
  return async (dispatch) => {
    try {
      const resp = await fetchConsult("borrar-aparto", { id: id }, "DELETE");
      const body = await resp.json();

      if (body.status === "success") {
        dispatch(deleteApartSuccess());
        swal.fire("Eliminado", "El Aparto se eliminó correctamente", "success");
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
        "eliminar-apartos",
        { data: data },
        "DELETE"
      );
      const body = await resp.json();
      if (body.status === "success") {
        swal.fire("Eliminados", body.msg, "success");
        dispatch(apartStartLoading());
        dispatch(addNewApartClear());
      } else {
        swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addInNewApart = (apart) => {
  return async (dispatch) => {
    dispatch(addInNewApartAction(apart));
  };
};

export const deleteInNewApart = () => {
  return async (dispatch) => {
    dispatch(deleteInNewApartAction());
  };
};

export const addInNewApartAction = (inventory) => ({
  type: types.UPDATE_DELETE_APART_ADDED,
  payload: inventory,
});

export const deleteInNewApartAction = () => ({
  type: types.UPDATE_DELETE_APART_DELETED,
});

const addNewApartClear = () => ({
  type: types.UPDATE_DELETE_APART_CLEAR,
});

const deleteApartSuccess = () => ({
  type: types.APART_DELETE_SUCCESS,
});

export const apartSetActive = (inventory) => ({
  type: types.APART_SET_ACTIVE,
  payload: inventory,
});

export const apartClearActive = () => ({
  type: types.APART_CLEAR_ACTIVE,
});

export const addNewApart = (apart) => ({
  type: types.ADD_NEW_INVENTORY,
  payload: apart,
});
export const addApartSuccess = (apart) => ({
  type: types.ADD_APART_SUCCESS,
  payload: apart,
});
export const addApartError = (state) => ({
  type: types.ADD_APART_ERROR,
  payload: state,
});

const apartLoaded = (apart) => ({
  type: types.APART_LOADED,
  payload: apart,
});

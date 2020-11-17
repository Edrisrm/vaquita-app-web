import {types} from '../types/types';
import { fetchConsult } from "../helpers/fetchService";

import swal from "sweetalert2";
import moment from "moment";

export function storeApart(apart) {
    console.log(apart);
    return async(dispatch) => {
        const resp = await fetchConsult("agregar-apartado", apart,"POST");
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
        }else{
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
            console.log(body);

                const apart = body.aparts.map((e)  => ({
                     ...e,
                    
                 }))
                dispatch(apartLoaded(apart));
            }else{
                swal.fire("Error", body.msg, "error");
            }
        } catch (error) {
            console.log(error);
        }
    }
}
//Modal
export const apartSetActive = (inventory) => ({
    type: types.APART_SET_ACTIVE,
    payload: inventory,
  });
  
  export const apartClearActive = () => ({
    type: types.APART_CLEAR_ACTIVE,
  });

// agregar apartos
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
    payload: state
});
//listar apartos
const apartLoaded = (apart) => ({
    type: types.APART_LOADED,
    payload: apart,
});
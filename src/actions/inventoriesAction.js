import { types } from "../types/types";

import {
    storeCurrentInventorie,
  } from "../services/inventoriesService";
import swal from 'sweetalert2';

export function storeInventories(inventorie){
    return async (dispatch) =>{
        const resp = await storeCurrentInventorie("inventario-vigente", inventorie,"POST");
        const body = await resp.json();
        dispatch(addInventorie());
        
            if (body.status === "success") {
                dispatch(addInventoireSuccess(inventorie))
                swal.fire(
                    'Correcto',
                    'El Producto se agregó correctamente',
                    'success'
                );
            }else{
                dispatch(addInventorieError(true));
                swal.fire({
                    icon: 'error',
                    title: 'Hubo un error',
                    text: 'Hubo un error intente de nuevo' ,
                });
            }
        
      
           
    }
}
const addInventorie = () => ({
    type: types.ADD_INVENTORIE,
    payload: true,
})
const addInventoireSuccess = inventorie => ({
    type: types.ADD_INVENTORIE_SUCCESS,
    payload: inventorie
})
const addInventorieError = state => ({
    type:types.ADD_INVENTORIE_ERROR,
    payload: state
})
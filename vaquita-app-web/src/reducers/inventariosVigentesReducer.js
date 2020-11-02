import {
    AGREGAR_INVENTARIO,
    AGREGAR_INVENTARIO_EXITO,
    AGREGAR_INVENTARIO_ERROR,
} from '../types';
const initialState = {
    inventarios: [],
    error: null,
    loading: false,
    inventarioeliminar: null,
    inventarioeditar:null,
};
export default function(state = initialState, action) {
    switch(action.type) {
        default:
            return state;
    }
}
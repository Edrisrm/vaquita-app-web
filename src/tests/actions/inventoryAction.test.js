import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import "@testing-library/jest-dom";
import Swal from 'sweetalert2';

import { storeInventory, updateBulk, uploadImage} from "../../actions/inventoryAction";
import { types } from "../../types/types";
import * as fetchModule from "../../helpers/fetchService";


jest.mock('sweetalert2', ()=> ({
  fire: jest.fn()
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
let store = mockStore(initState);

Storage.prototype.setItem = jest.fn();

let inventory = {
  age_in_months: "23 años 3 meses",
  apartValue: "5fb99ac773e4942578b0a058",
  breed: "EdrisTorote",
  photo: undefined,
  weight: "33",
};

describe("Pruebas en las acciones Inventario Vigente", () => {
  beforeEach(() => {
    store = mockStore(initState);
    jest.clearAllMocks();
  });

  test("Agregar registro a inventario correcto", async () => {
    fetchModule.fetchConsult = jest.fn(() => ({
      json() {
        return {
          inventory: {
            age_in_months: "23 años 3 meses",
            animal_number: 14,
            apart: "5fb99ac773e4942578b0a058",
            breed: "EdrisTorote",
            date: "2020-11-22T00:45:37.516Z",
            image: null,
            status: "en_finca",
            weight: 33,
            __v: 0,
            _id: "5fb9b4b1c8827538de2d31fc",
          },
          msg: "Agregado correctamente",
          status: "success",
        };
      },
    }));

    await store.dispatch(storeInventory(inventory));

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.ADD_NEW_INVENTORY,
      payload: true,
    });

    expect(actions[1]).toEqual({
      type: types.ADD_INVENTORY_SUCCESS,
    });

    expect(actions[2]).toEqual({
      type: types.INVENTORY_CLEAR_ACTIVE,
    });
  });

  test("Agregar registro a inventario incorrecto", async () => {
    fetchModule.fetchConsult = jest.fn(() => ({
      json() {
        return {
          msg: "error",
          status: "error",
        };
      },
    }));

    await store.dispatch(storeInventory(inventory));
    let actions = store.getActions();

    expect(actions[1]).toEqual({
      type: types.ADD_INVENTORY_ERROR,
      payload: true,
    });
  });


  test("Actualizar en masa incorrecto", async () => {
    fetchModule.fetchConsult = jest.fn(() => ({
      json() {
        return {
          msg: "error",
          status: "error",
        };
      },
    }));

    await store.dispatch(updateBulk(inventory));
    let actions = store.getActions();

    expect( actions ).toEqual([]);
    expect( Swal.fire ).toHaveBeenCalledWith("Error", 'Error al actualizar en masa', "error");
  });


  test("Subir imagen al inventario incorrecto", async () => {
    fetchModule.fetchConsult = jest.fn(() => ({
      json() {
        return {
          msg: "error",
          status: "error",
        };
      },
    }));

    let formData = new FormData();

    formData.append("file0", inventory);

    await store.dispatch(uploadImage(inventory));
    let actions = store.getActions();

     expect(actions[0]).toEqual({
      type: types.INVENTORY_IMAGE_UPLOAD_ERROR,
    });    


    expect( Swal.fire ).toHaveBeenCalledWith("Error", 'No se pudo subir la imagen', "error");
  });



});

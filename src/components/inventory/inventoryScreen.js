import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { InventoryModal } from "./inventoryModal";
import { uiOpenModal } from "../../actions/uiAction";
import swal from "sweetalert2";

import {
  inventorySetActive,
  inventoryStartLoading,
  deleteOneInventory,
  inventoryClearActive
} from "../../actions/inventoryAction";

import moment from "moment";

moment.locale('es');

export const InventoryScreen = () => {
  const dispatch = useDispatch();

  const { inventory } = useSelector((state) => state.inventory);

  const onSelectInventory = (item) => {
    dispatch(inventorySetActive(item));
    openModal();
  };
  const onSelectInventoryOneDelete = (item) =>{
    dispatch(inventorySetActive(item));
    oneDeleteInventory(item);
  }
  const oneDeleteInventory = id =>{
    swal.fire({
      title: '¿Estas seguro?',
      text: "Un inventario que se elimina no se puede recuperar",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!!',
      cancelButtonText: 'Cancelar'
  }).then((result) => {
      if (result.value) {
          // pasarlo al action
          dispatch( deleteOneInventory(id) );
      }
  });
  }
  const addInventory = () => {
    openModal();
  };

  const openModal = (e) => {
    dispatch(uiOpenModal());
  };

  useEffect(() => {
    dispatch(inventoryStartLoading());
  }, [dispatch]);

  return (
    <div>
      <div>
        <h4 className="center-align">Inventario vigente del ganado</h4>
      </div>
      <div className="center-align">
        <button onClick={addInventory} className="btn  teal darken-2">
          <i className="material-icons right">cloud</i>Agregar animal
        </button>
      </div>
      <br></br>
      <br></br>
      <hr></hr>
      <table className="responsive-table striped highlight indigo lighten-4">
        <thead>
          <tr>
            <th>Nº de animal</th>
            <th>Foto</th>
            <th>Raza</th>
            <th>Peso</th>
            <th>Edad</th>
            <th>Fecha de registro</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item, index) => (
            <tr key={index}>
              <th>{item.animal_number}</th>
              <th>{item.image}</th>
              <th>{item.breed}</th>
              <th>{item.weight}</th>
              <th>{item.age_in_months}</th>
              <th>{moment(item.id).format("MMM DD, YYYY HH:MM")}</th>
              <th>
                <button
                  onClick={() => onSelectInventory(item)}
                  className="btn yellow darken-4"
                >
                  <i className="material-icons left">edit</i>
                </button>
                <button className="btn red darken-4" onClick={() => onSelectInventoryOneDelete(item)}>
                  <i className="material-icons right">delete</i>
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>

      <InventoryModal />
    </div>
  );
};

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { inventoryStartLoading } from "../../actions/inventoryAction";
import { useSelector } from "react-redux";

import { InventoryModal } from "./inventoryModal";

export const Inventory = () => {
  const dispatch = useDispatch();

  const { inventory, currentInventory } = useSelector(
    (state) => state.inventory
  );

  useEffect(() => {
    dispatch(inventoryStartLoading());
  }, [dispatch]);

  return (
    <div>
      <div>
        <h4 className="center-align">Inventario vigente del ganado</h4>
      </div>
      <div className="center-align">
        <InventoryModal />
      </div>

      <table className="responsive-table">
        <thead>
          <tr>
            <th>Número</th>
            <th>Foto</th>
            <th>Raza</th>
            <th>Estado</th>
            <th>Potrero</th>
            <th>Peso</th>
            <th>Edad</th>
            <th>Acciones</th>
            

          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item._id}>
              <th>{item.animal_number}</th>
              <th>{item.image}</th>
              <th>{item.breed}</th>
              <th>{item.status}</th>
              <th>{item.division}</th>
              <th>{item.weight}</th>
              <th>{item.age_in_months}</th>
              <th>
                <button
                  className="btn btn-outline-danger"
                  data-toggle="modal"
                  data-target="#"
                >
                  X
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

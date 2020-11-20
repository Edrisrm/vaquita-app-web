import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { InventoryModal } from "./inventoryModal";
import { uiOpenModal } from "../../actions/uiAction";
import swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import SearchResults from "react-filter-search";
import {
  inventorySetActive,
  inventoryStartLoading,
  deleteOneInventory,
  inventoryClearActive,
} from "../../actions/inventoryAction";

import moment from "moment";

export const InventoryScreen = () => {
  const dispatch = useDispatch();

  const { inventory, count } = useSelector((state) => state.inventory);

  const { role } = useSelector((state) => state.auth);

  const onSelectInventory = (item) => {
    dispatch(inventorySetActive(item));
    openModal();
  };
  const onSelectInventoryOneDelete = (item) => {
    dispatch(inventorySetActive(item));
    oneDeleteInventory(item);
  };
  const oneDeleteInventory = (id) => {
    swal
      .fire({
        title: "¿Estas seguro?",
        text: "El inventario no se volerá a recuperar",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar!!",
        cancelButtonText: "Cancelar",
      })
      .then((result) => {
        if (result.value) {
          dispatch(deleteOneInventory(id));
        } else {
          dispatch(inventoryClearActive());
        }
      });
  };

  const addInventory = () => {
    openModal();
  };

  const openModal = (e) => {
    dispatch(uiOpenModal());
  };

  useEffect(
    (page) => {
      dispatch(inventoryStartLoading(page));
    },
    [dispatch]
  );

  const [value, setValue] = useState("");
  const handleChange = (e) => {
    const { value } = e.target;
    setValue(value);
  };
  return (
    <div>
      <div>
        <h4 className="center-align">Inventario vigente del ganado</h4>
      </div>
      <div hidden={role === "ROLE_VIEWER"} className="center-align">
        <button onClick={addInventory} className="btn  teal darken-2">
          <i className="material-icons right">cloud</i>Agregar animal
        </button>
      </div>
      <br></br>
      <br></br>
      <hr></hr>
      <div className="row">
        <div className="center-aling">
          <div className="input-field col s12">
            <i className="material-icons prefix">search</i>
            <input
              id="icon_prefix2"
              className="input-field"
              placeholder="Search"
              type="text"
              value={value}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <br></br>
      <SearchResults
        value={value}
        data={inventory}
        renderResults={(results) => (
          <table className="responsive-table striped highlight indigo lighten-4">
            <thead>
              <tr>
                <th>Nº de animal</th>
                <th>Foto</th>
                <th>Raza</th>
                <th>Peso</th>
                <th>Edad</th>
                <th>Fecha de registro</th>
                <th hidden={role === "ROLE_VIEWER"}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {results.map((item) => (
                <tr key={item._id}>
                  <th>{item.animal_number}</th>
                  <th>{item.image}</th>
                  <th>{item.breed}</th>
                  <th>{item.weight}</th>
                  <th>{item.age_in_months}</th>
                  <th>{moment(item.id).format("MMM DD, YYYY HH:MM")}</th>
                  <th hidden={role === "ROLE_VIEWER"}>
                    <button
                      onClick={() => onSelectInventory(item)}
                      className="btn yellow darken-4"
                    >
                      <i className="material-icons left">edit</i>
                    </button>
                    <button
                      className="btn red darken-4"
                      onClick={() => onSelectInventoryOneDelete(item)}
                    >
                      <i className="material-icons right">delete</i>
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      />
      <br></br>
      <div className="center-align">
        <ReactPaginate
          pageCount={Math.ceil(count / 2)}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          previousLabel={"Atras"}
          nextLabel={"Adelante"}
          onPageChange={(data) =>
            dispatch(inventoryStartLoading(data.selected + 1))
          }
          containerClassName={"pagination center-aling"}
        />
      </div>
      <br></br>

      <InventoryModal />
    </div>
  );
};

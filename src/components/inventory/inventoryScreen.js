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
  addInNewInventory,
  deleteInNewInventory,
  updateBulk,
  deleteBulk,
} from "../../actions/inventoryAction";

export const InventoryScreen = () => {
  const dispatch = useDispatch();

  const baseUrl = process.env.REACT_APP_API_URL;

  const { inventory, count, updateDeleteManyInventory } = useSelector(
    (state) => state.inventory
  );

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

  const openModal = () => {
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

  const toggleCheckbox = (e, item) => {
    if (e.target.checked) {
      dispatch(addInNewInventory(item));
    } else {
      dispatch(inventorySetActive(item));
      dispatch(deleteInNewInventory());
    }
  };
  const updateInBulk = () => {
    swal
      .fire({
        title: "¿Estas seguro?",
        text: "Estos registros no se podran cambiar",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Actualizalos!!",
        cancelButtonText: "Cancelar",
      })
      .then((result) => {
        if (result.value) {
          if (updateDeleteManyInventory.length > 0) {
            dispatch(updateBulk(updateDeleteManyInventory));
          } else {
            console.log("primero dale check a algun registro");
          }
        } else {
          dispatch(inventoryClearActive());
        }
      });
  };

  const deleteInBulk = () => {
    swal
      .fire({
        title: "¿Estas seguro?",
        text: "Estos registros no se volerá a recuperar",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar!!",
        cancelButtonText: "Cancelar",
      })
      .then((result) => {
        if (result.value) {
          if (updateDeleteManyInventory.length > 0) {
            dispatch(deleteBulk(updateDeleteManyInventory));
          } else {
            console.log("primero dale check a algun registro");
          }
        } else {
          dispatch(inventoryClearActive());
        }
      });
  };

  return (
    <div>
      <div>
        <h4 className="center-align">Inventario vigente del ganado</h4>
      </div>
      <div hidden={role === "ROLE_VIEWER"} className="center-align">
        <button onClick={addInventory} className="btn green darken-4">
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
      <div
        hidden={
          updateDeleteManyInventory.length === 0 || role === "ROLE_VIEWER"
        }
      >
        <button className="btn red accent-4" onClick={() => deleteInBulk()}>
          <i className="material-icons right">delete</i> Eliminar animales
        </button>

        <button className="btn yellow darken-4" onClick={() => updateInBulk()}>
          <i className="material-icons right">edit</i> Marcar como vendidos
        </button>
      </div>

      <br></br>

      <SearchResults
        value={value}
        data={inventory}
        renderResults={(results) => (
          <table className="responsive-table striped highlight indigo lighten-4">
            <thead>
              <tr>
                <th>Foto</th>
                <th>Nº de animal</th>
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
                  <th>
                    <img
                      alt=""
                      src={
                        item.image
                          ? `${baseUrl}/inventory-file/${item.image}`
                          : "https://becagrafic.com/wp-content/uploads/2019/09/imagen-no-disponible.jpg"
                      }
                      height="200"
                      width="200"
                    />
                  </th>
                  <th>
                    <p>
                      <label hidden={role === "ROLE_VIEWER"}>
                        <input
                          type="checkbox"
                          value={item._id}
                          onChange={(e) => toggleCheckbox(e, item)}
                        />
                        <span className="black-text">{item.animal_number}</span>
                      </label>
                      <span
                        className="black-text"
                        hidden={role !== "ROLE_VIEWER"}
                      >
                        {item.animal_number}
                      </span>
                    </p>
                  </th>
                  <th>{item.breed}</th>
                  <th>{item.weight}kg</th>
                  <th>{item.age_in_months}</th>
                  <th>{item.date}</th>
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
          pageCount={Math.ceil(count / 10)}
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

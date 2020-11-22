import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { uiOpenModal } from "../../actions/uiAction";
import { ApartModal } from "./apartModal";
import swal from "sweetalert2";

import {
  apartStartLoading,
  deleteApart,
  apartSetActive,
  apartClearActive,
  deleteBulk,
  addInNewApart,
  deleteInNewApart,
} from "../../actions/apartAction";

export const ApartScreen = () => {
  const dispatch = useDispatch();

  const { apart, updateDeleteManyApart } = useSelector((state) => state.apart);
  const { role } = useSelector((state) => state.auth);

  const addApart = () => {
    openModal();
  };

  const deleteInBulk = () => {
    swal
      .fire({
        title: "¿Estas seguro?",
        text: "Estos registros no se volerán a recuperar",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar!!",
        cancelButtonText: "Cancelar",
      })
      .then((result) => {
        if (result.value) {
          if (updateDeleteManyApart.length > 0) {
            dispatch(deleteBulk(updateDeleteManyApart));
          } else {
            console.log("primero dale check a algun registro");
          }
        } else {
          dispatch(apartClearActive());
        }
      });
  };

  const openModal = () => {
    dispatch(uiOpenModal());
  };
  const deleteOneApart = (id) => {
    swal
      .fire({
        title: "¿Estas seguro?",
        text: "Un aparto que se elimina no se puede recuperar",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar!!",
        cancelButtonText: "Cancelar",
      })
      .then((result) => {
        if (result.value) {
          dispatch(deleteApart(id));
        } else {
          dispatch(apartClearActive());
        }
      });
  };
  const onSelectApartOneDelete = (item) => {
    dispatch(apartSetActive(item));
    deleteOneApart(item);
  };

  const toggleCheckbox = (e, item) => {
    if (e.target.checked) {
      dispatch(addInNewApart(item));
    } else {
      dispatch(apartSetActive(item));
      dispatch(deleteInNewApart());
    }
  };

  useEffect(() => {
    dispatch(apartStartLoading());
  }, [dispatch]);
  return (
    <div>
      <div>
        <h4 className="center-align">Apartos de la finca</h4>
      </div>
      <div hidden={role === "ROLE_VIEWER"} className="center-align">
        <button onClick={addApart} className="btn  green darken-4">
          <i className="material-icons right">cloud</i>Agregar Aparto
        </button>
      </div>
      <br></br>
      <br></br>
      <div
        hidden={updateDeleteManyApart.length === 0 || role === "ROLE_VIEWER"}
      >
        <button className="btn red accent-4" onClick={() => deleteInBulk()}>
          <i className="material-icons right">delete</i> Eliminar apartos
        </button>
      </div>

      <br></br>
      <hr></hr>
      <table className="responsive-table striped highlight indigo lighten-4">
        <thead>
          <tr>
            <th>Metros cuadrados</th>
            <th>Número de aparto</th>
            <th hidden={role === "ROLE_VIEWER"}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {apart.map((item, index) => (
            <tr key={index}>
              <th>
                <p>
                  <label hidden={role === "ROLE_VIEWER"} >
                    <input
                      type="checkbox"
                      value={item._id}
                      onChange={(e) => toggleCheckbox(e, item)}
                    />
                    <span className="black-text">{item.square_meter}m²</span>
                  </label>
                  <span hidden={role !== "ROLE_VIEWER"} className="black-text">
                    {item.square_meter}m²
                  </span>
                </p>
              </th>
              <th>{item.apart_number}</th>
              <th hidden={role === "ROLE_VIEWER"}>
                <button
                  className="btn red accent-3"
                  onClick={() => onSelectApartOneDelete(item)}
                >
                  <i className="material-icons right">delete</i>
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
      <ApartModal />
    </div>
  );
};

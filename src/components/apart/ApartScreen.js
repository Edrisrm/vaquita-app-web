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
  //apartClearActive,
} from "../../actions/apartAction";

export const ApartScreen = () => {
  const dispatch = useDispatch();

  const { apart } = useSelector((state) => state.apart);
  const { role } = useSelector((state) => state.auth);

  const addApart = () => {
    openModal();
  };

  const openModal = (e) => {
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
  useEffect(() => {
    dispatch(apartStartLoading());
  }, [dispatch]);
  return (
    <div>
      <div>
        <h4 className="center-align">Apartos de la finca</h4>
      </div>
      <div hidden={role === "ROLE_VIEWER"} className="center-align">
        <button onClick={addApart} className="btn teal darken-2">
          <i className="material-icons right">cloud</i>Agregar Aparto
        </button>
      </div>
      <br></br>
      <br></br>
      <hr></hr>
      <table className="responsive-table striped highlight indigo lighten-4">
        <thead>
          <tr>
            <th>Metros cuadrados</th>
            <th>Número de aparto</th>
            <th hidden={role === "ROLE_VIEWER"} >Acciones</th>
          </tr>
        </thead>
        <tbody>
          {apart.map((item, index) => (
            <tr key={index}>
              <th>{item.square_meter}m²</th>
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

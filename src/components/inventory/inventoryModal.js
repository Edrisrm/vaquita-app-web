/* eslint-disable no-use-before-define */
import React, { useCallback, useEffect, useState } from "react";
import M from "materialize-css";
import { useDispatch, useSelector } from "react-redux";
import { uiCloseModal, uiOpenModal } from "../../actions/uiAction";
import Swal from "sweetalert2";
import Spinner from "../ui/Spinner/Spinner";

const initEvent = {
  breed: "",
  weight: "",
  age_in_months: "",
  division: "",
};

export const InventoryModal = () => {
  
  const { activeEvent } = useSelector((state) => state.auth);

  const [formValues, setFormValues] = useState(initEvent);

  const { breed, weight, age_in_months, division } = formValues;

  const loading = useSelector((state) => state.inventory.loading);
  const error = useSelector((state) => state.inventory.error);
  const dispatch = useDispatch();

  useEffect(() => {
    var elems = document.querySelectorAll(".modal");
    M.Modal.init(elems, { onCloseEnd: closeModal });

    if (activeEvent) {
      setFormValues(activeEvent);
    } else {
      setFormValues(initEvent);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeEvent, setFormValues]);

  const openModal = () => {
    dispatch(uiOpenModal());
  };

  const closeModal = useCallback(() => {
    dispatch(uiCloseModal());
  }, [dispatch]);

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    if (
      breed.trim() === "" ||
      weight <= 0 ||
      age_in_months.trim() === "" ||
      division.trim() === ""
    ) {
      Swal.fire("ERROR", "Faltan datos", "error");
      return;
    }

    if (activeEvent) {
      console.log("actualizacion");
    } else {
      console.log("registro");
    }

    closeModal();
  };

  return (
    <div>
      <button
        onClick={openModal}
        data-target="modal1"
        className="btn modal-trigger"
      >
        AGREGAR ANIMAL
      </button>
      <div id="modal1" className="modal">
        <div className="modal-content">
          <h5> {activeEvent ? "Editar evento" : "Nuevo evento"} </h5>
          <hr />
        </div>

        <div>
          <div className="row">
            <form className="col s12" onSubmit={handleSubmitForm}>
              <div className="row">
                <div className="input-field col s6">
                  <i className="fas fa-paw prefix"></i>
                  <input
                    id="icon_prefix"
                    type="text"
                    className="validate"
                    name="breed"
                    value={breed}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="icon_prefix">Raza</label>
                </div>

                <div className="input-field col s6">
                  <i className="fas fa-weight prefix"></i>
                  <input
                    id="icon_telephone"
                    type="number"
                    className="validate"
                    name="weight"
                    value={weight}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="icon_telephone">Peso</label>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s6">
                  <i className="far fa-clock prefix"></i>
                  <input
                    id="icon_prefix"
                    type="text"
                    className="validate"
                    name="age_in_months"
                    value={age_in_months}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="icon_prefix">Edad en meses</label>
                </div>

                <div className="input-field col s6">
                  <i className="fas fa-hat-cowboy-side prefix"></i>
                  <input
                    id="icon_prefix"
                    type="text"
                    className="validate"
                    name="division"
                    value={division}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="division">Potrero</label>
                </div>
              </div>

              <div className="row">
                <input className="col s6" type="file" name="image" />
              </div>
              <div className="row">
                <button type="submit" className="btn btn-success center-alings">
                  Agregar
                </button>
              </div>
              {loading ? <Spinner /> : null}
              {error ? <p className="center-alings">Hubo un error</p> : null}
            </form>
          </div>
        </div>

        <div className="modal-footer">
          <button className=" modal-action modal-close waves-effect waves-green btn-flat">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

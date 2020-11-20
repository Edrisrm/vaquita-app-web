/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiCloseModal } from "../../actions/uiAction";
import Swal from "sweetalert2";
import Modal from "react-modal";
import { customModal } from "../../helpers/customModal";
import {
  inventoryClearActive,
  storeInventory,
} from "../../actions/inventoryAction";

import Spinner from "../ui/Spinner";

const initEvent = {
  breed: "",
  weight: "",
  age_in_months: "",
  division: "",
};

Modal.setAppElement("#root");

export const InventoryModal = () => {
  const { modalOpen } = useSelector((state) => state.ui);

  const { currentInventory } = useSelector((state) => state.inventory);

  const [formValues, setFormValues] = useState(initEvent);

  const { breed, weight, age_in_months, division } = formValues;

  const loading = useSelector((state) => state.inventory.loading);
  const error = useSelector((state) => state.inventory.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentInventory) {
      setFormValues(currentInventory);
    } else {
      setFormValues(initEvent);
    }
  }, [currentInventory, setFormValues]);

  const closeModal = () => {
    dispatch(uiCloseModal());
    dispatch(inventoryClearActive());
    setFormValues(initEvent);
  };

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

    if (currentInventory) {
      console.log("actualizacion");
    } else {
      dispatch(storeInventory(formValues));
    }
    closeModal();
  };

  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={closeModal}
      style={customModal}
      closeTimeoutMS={200}
      className="modal"
      overlayClassName="modal-bg"
    >
      <div className="modal-content">
        <h5>
          {" "}
          {currentInventory
            ? "Editar registro de animal"
            : "Agregar nuevo animal"}{" "}
        </h5>
        <hr />
      </div>

      <div>
        <div className="row">
          <form className="col s12" onSubmit={handleSubmitForm}>
            <div className="row">
              <div className=" col s6">
                <i className="fas fa-paw prefix"></i>
                {currentInventory ? (
                  <input
                    disabled
                    id="icon_prefix"
                    type="text"
                    className="validate"
                    name="breed"
                    value={breed}
                    onChange={handleInputChange}
                  />
                ) : (
                  <input
                    id="icon_prefix"
                    type="text"
                    className="validate"
                    name="breed"
                    value={breed}
                    onChange={handleInputChange}
                  />
                )}

                <label htmlFor="icon_prefix">Raza</label>
              </div>

              <div className=" col s6">
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
              <div className=" col s6">
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

              <div className=" col s6">
                <i className="fas fa-hat-cowboy-side prefix"></i>
                <input
                  id="icon_prefix"
                  type="text"
                  disabled={currentInventory}
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
              <button type="submit" className="btn teal darken-4 center-alings">
                {currentInventory ? "Editar" : "Agregar"}{" "}
              </button>
            </div>
            {loading ? <Spinner /> : null}
            {error ? <p className="center-alings">Hubo un error</p> : null}
          </form>
        </div>
      </div>

      <div className="modal-footer">
        <button
          onClick={closeModal}
          className=" modal-action modal-close waves-effect waves-green btn-flat"
        >
          Cerrar
        </button>
      </div>
    </Modal>
  );
};

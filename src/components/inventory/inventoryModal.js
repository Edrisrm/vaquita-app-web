import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiCloseModal } from "../../actions/uiAction";
import { customModal } from "../../helpers/customModal";
import { apartStartLoading } from "../../actions/apartAction";

import {
  inventoryClearActive,
  storeInventory,
  editOneInventory,
} from "../../actions/inventoryAction";

import Spinner from "../ui/Spinner";
import "image-upload-react/dist/index.css";

import Swal from "sweetalert2";
import Modal from "react-modal";
import ImageUpload from "image-upload-react";

const initEvent = {
  breed: "",
  weight: "",
  age_in_months: "",
  apartValue: "",
  photo: undefined,
};
Modal.setAppElement("#root");

export const InventoryModal = () => {
  const { modalOpen } = useSelector((state) => state.ui);

  const [imageSrc, setImageSrc] = useState();

  const { currentInventory } = useSelector((state) => state.inventory);

  const { apart } = useSelector((state) => state.apart);

  const [formValues, setFormValues] = useState(initEvent);

  const { breed, weight, age_in_months, apartValue, photo } = formValues;

  const loading = useSelector((state) => state.inventory.loading);
  const error = useSelector((state) => state.inventory.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(apartStartLoading());
    if (currentInventory) {
      setFormValues(currentInventory);
    } else {
      setFormValues(initEvent);
    }
  }, [currentInventory, setFormValues, dispatch]);

  const closeModal = () => {
    dispatch(uiCloseModal());
    dispatch(inventoryClearActive());
    setFormValues(initEvent);
    setImageSrc(null);
  };

  const handleInputChange = ({ target }) => {
    if (target.files) {
      setImageSrc(URL.createObjectURL(target.files[0]));
      setFormValues({
        ...formValues,
        photo: target.files[0],
      });
    } else {
      setFormValues({
        ...formValues,
        [target.name]: target.value,
      });
    }
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (
      !currentInventory &&
      (breed.trim() === "" ||
        weight <= 0 ||
        age_in_months.trim() === "" ||
        !apartValue)
    ) {
      Swal.fire("ERROR", "Faltan datos", "error");
      return;
    }

    if (currentInventory) {
      dispatch(editOneInventory(formValues));
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
                <input
                  disabled={currentInventory}
                  id="icon_prefix"
                  type="text"
                  className="validate"
                  name="breed"
                  value={breed}
                  onChange={handleInputChange}
                />

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

              <i className="fas fa-hat-cowboy-side prefix"></i>
              <div className=" col s6">
                <select
                  disabled={currentInventory}
                  value={apartValue}
                  onChange={handleInputChange}
                  name="apartValue"
                  className="browser-default custom-select"
                >
                  <option value={null}>Elegir</option>
                  {apart.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.apart_number}
                    </option>
                  ))}
                </select>
                <label htmlFor="apartValue">Potrero</label>
              </div>
            </div>
            <ImageUpload
              handleImageSelect={handleInputChange}
              imageSrc={imageSrc}
              setImageSrc={setImageSrc}
              name="photo"
              value={photo}
              style={{
                width: "100%",
                height: 400,
                background: "green",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            />

            <label htmlFor="imageSrc">Foto</label>

            <br></br>
            <hr></hr>
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

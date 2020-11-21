import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiCloseModal } from "../../actions/uiAction";
import Swal from "sweetalert2";
import Modal from "react-modal";
import { customModal } from "../../helpers/customModal";
import { apartClearActive, storeApart } from "../../actions/apartAction";
import Spinner from "../ui/Spinner";

const initEvent = {
  square_meter: "",
  apart_number: "",
};
Modal.setAppElement("#root");

export const ApartModal = () => {
  const { modalOpen } = useSelector((state) => state.ui);

  const { currentApart } = useSelector((state) => state.apart);

  const [formValues, setFormValues] = useState(initEvent);

  const { square_meter, apart_number } = formValues;

  const loading = useSelector((state) => state.apart.loading);
  const error = useSelector((state) => state.apart.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentApart) {
      setFormValues(currentApart);
    } else {
      setFormValues(initEvent);
    }
  }, [currentApart, setFormValues]);

  const closeModal = () => {
    dispatch(uiCloseModal());
    dispatch(apartClearActive());
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

    if (square_meter <= 0 || apart_number <= 0) {
      Swal.fire("ERROR", "Faltan datos", "error");
      return;
    }

    if (currentApart) {
      console.log("actualizacion");
    } else {
      dispatch(storeApart(formValues));
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
        <h5>Agregar un aparto</h5>
        <hr />
      </div>
      <div>
        <div className="row">
          <form className="col s12" onSubmit={handleSubmitForm}>
            <div className="row">
              <div className="col s12">
                <i className="fas fa-superscript prefix"></i>
                <input
                  id="icon_prefix"
                  type="text"
                  className="validate"
                  name="square_meter"
                  value={square_meter}
                  onChange={handleInputChange}
                />
                <label htmlFor="icon_prefix">Metros cuadrados</label>
              </div>
              <div className="col s12">
                <i className="fas fa-sort-numeric-up-alt prefix"></i>
                <input
                  id="icon_prefix"
                  type="number"
                  className="validate"
                  name="apart_number"
                  value={apart_number}
                  onChange={handleInputChange}
                />
                <label htmlFor="icon_prefix">Número de aparto</label>
              </div>
            </div>
            <div className="divider"></div>
            <br></br>
            <br></br>
            <div className="row">
              <div className="center-aling">
                <button type="submit" className="btn teal darken-4">
                  Agregar
                </button>
              </div>
            </div>
          </form>
          {loading ? <Spinner /> : null}
          {error ? <p className="center-aling">Hubo un error</p> : null}
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

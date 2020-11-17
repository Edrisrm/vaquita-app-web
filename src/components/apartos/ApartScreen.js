import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { uiOpenModal } from "../../actions/uiAction";
import {ApartModal} from "./apartModal";
import {
    apartStartLoading
  } from "../../actions/apartAction";
import moment from "moment";

moment.locale('es');

export const ApartScreen = () => {
    const dispatch = useDispatch();

    const { apart } = useSelector((state) => state.apart);
    console.log(apart);

    const addApart = () => {
      openModal();
    };
    const openModal = (e) => {
      dispatch(uiOpenModal());
    }
    useEffect(() => {
        dispatch(apartStartLoading());
      }, [dispatch]);
    return (
        <div>
            <div>
                <h4 className="center-align">Apartos de la finca</h4>
            </div>
            <div className="center-align">
                <button onClick={addApart}  className="btn green darken-4">
                    <i className="material-icons right">cloud</i>Agregar Aparto
                </button>
            </div>
            <br></br>
            <br></br>
            <hr></hr>
            <table className="responsive-table">
        <thead>
          <tr>
            <th>Metros cuadrados</th>
            <th>Número de aparto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {apart.map((item, index) => (
            <tr key={index}>
              <th>{item.square_meter}m²</th>
              <th>{item.apart_number}</th>
              <th>
                <button className="btn red accent-4">
                  <i className="material-icons right">delete</i>
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
      <ApartModal/>
        </div>
    )
}
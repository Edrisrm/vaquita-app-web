import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { recordsStartLoading } from "../../actions/recordsAction";
import moment from "moment";

moment.locale("es");

export const RecordsScreen = () => {
  const dispatch = useDispatch();

  const { records } = useSelector((state) => state.records);

  useEffect(() => {
    dispatch(recordsStartLoading());
  }, [dispatch]);

  return (
    <div>
      <div>
        <h4 className="center-align">Historial de ganado vendido</h4>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <table className="responsive-table">
        <thead>
          <tr>
            <th>Nº de animal</th>
            <th>Foto</th>
            <th>Raza</th>
            <th>Peso</th>
            <th>Fecha de registro</th>
          </tr>
        </thead>
        <tbody>
          {records.map((item, index) => (
            <tr key={index}>
              <th>{item.animal_number}</th>
              <th>{item.image}</th>
              <th>{item.breed}</th>
              <th>{item.weight}</th>
              <th>{moment(item.id).format("MMM DD, YYYY HH:MM")}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

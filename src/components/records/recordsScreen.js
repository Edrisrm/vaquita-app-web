import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { recordsStartLoading } from "../../actions/recordsAction";
import moment from "moment";
import ReactPaginate from "react-paginate";
import SearchResults from "react-filter-search";

export const RecordsScreen = () => {
  const dispatch = useDispatch();

  const { records } = useSelector((state) => state.records);

  const { count } = useSelector((state) => state.records);

  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;
    setValue(value);
  };

  const FetchData = (page = 1) => {
    dispatch(recordsStartLoading(page));
  };
  useEffect(() => {
    FetchData(1);
  }, []);

  return (
    <div>
      <div>
        <h4 className="center-align">Historial de ganado vendido</h4>
      </div>
      <br></br>
      <br></br>
      <br></br>
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
        data={records}
        renderResults={(results) => (
          <table className="responsive-table striped highlight indigo lighten-4">
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
              {results.map((item, index) => (
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
        )}
      />

      <br></br>
      <div className="center-align">
        <ReactPaginate
          pageCount={Math.ceil(count / 3)}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          previousLabel={"Atras"}
          nextLabel={"Adelante"}
          onPageChange={(data) => FetchData(data.selected + 1)}
          containerClassName={"pagination center-aling"}
        />
      </div>
      <br></br>
    </div>
  );
};

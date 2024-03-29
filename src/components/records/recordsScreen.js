import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { recordsStartLoading } from "../../actions/recordsAction";
import ReactPaginate from "react-paginate";
import SearchResults from "react-filter-search";

export const RecordsScreen = () => {
  const dispatch = useDispatch();

  const { records, count } = useSelector((state) => state.records);
  const [value, setValue] = useState("");

  const baseUrl = process.env.REACT_APP_API_URL;

  const handleChange = (e) => {
    const { value } = e.target;
    setValue(value);
  };

  useEffect(
    (page) => {
      dispatch(recordsStartLoading(page));
    },
    [dispatch]
  );

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
                  <th>{item.breed}</th>
                  <th>{item.weight}kg</th>
                  <th>{item.date}</th>
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
            dispatch(recordsStartLoading(data.selected + 1))
          }
          containerClassName={"pagination center-aling"}
        />
      </div>
      <br></br>
    </div>
  );
};

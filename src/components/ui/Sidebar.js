import React, { useEffect } from "react";
import M from "materialize-css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../actions/authAction";

import "../../assets/css/sidebarStyle.css";

export const Sidebar = () => {
  const { id, picture, given_name } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(startLogout(id));
  };

  useEffect(() => {
    let sidenav = document.querySelector("#slide-out");
    M.Sidenav.init(sidenav, {});
  }, []);
  return (
    <div>
      <nav className="light-green darken-4">
        <div className="light-green darken-4">
          <a
            href="localhost"
            data-target="slide-out"
            className="sidenav-trigger show-on-large"
          >
            <i className="material-icons">menu</i>
          </a>
          <ul id="nav-mobile" className="right">
            <li>
              <img
              id="imgGoogle"
                src={picture}
                alt=""
                width="45px"
                className="circle responsive-img"
              />
            </li>

            <li>
              <a href="#name">
                <span className="white-text name">{`${given_name}`}</span>
              </a>
            </li>

            <li>
              <Link
                className="navbar-brand"
                onClick={handleLogout}
                to="/acceso"
              >
                Cerrar Sesion
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <ul id="slide-out" className="sidenav light-green">
        <li>
          <Link className="white-text" to="/inventarios-vigentes">
            Inventario Vigente
          </Link>
        </li>
        <li>
          <Link className="white-text" to="/apartos">
            Apartos
          </Link>
        </li>
        <li>
          <Link className="white-text" to="/historicos">
            Históricos
          </Link>
        </li>
      </ul>
    </div>
  );
};

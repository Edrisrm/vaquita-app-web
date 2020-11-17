import React, { useEffect } from "react";
import M from "materialize-css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { startLogout } from "../../actions/authAction";

export const Sidebar = () => {
  const dispatch = useDispatch();
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startLogout());
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
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link className="navbar-brand" onClick={handleLogin} to="/acceso">
                Cerrar Sesion
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <ul id="slide-out" className="sidenav light-green">
        <li>
          <div className="user-view">
            <div className="background"></div>
            <a href="#name">
              <span className="white-text name">John Doe</span>
            </a>
            <a href="#email">
              <span className="white-text email">jdandturk@gmail.com</span>
            </a>
          </div>
        </li>
        <li>
          <Link to="/inventarios-vigentes">Inventario Vigente</Link>
        </li>
        <li>
          <Link to="/apartos">Apartos</Link>
        </li>
        <li>
          <Link to="/historicos">Históricos</Link>
        </li>
      </ul>
    </div>
  );
};

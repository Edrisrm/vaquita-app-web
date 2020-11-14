import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { startLogout } from "../../actions/auth";
export const Navbar = () => {

  const dispatch = useDispatch();

    const handleLogin = (e) => {
      
      e.preventDefault();
      dispatch(startLogout ());

      };

  return (
    <Link className="navbar-brand"  onClick={handleLogin} to="/acceso">
        Cerrar Sesion
    </Link>
  );
};

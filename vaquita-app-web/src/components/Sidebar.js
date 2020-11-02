import React, { useState, useEffect } from 'react';
import M from  '../../node_modules/materialize-css/dist/js/materialize';
import { Link } from 'react-router-dom';
import vaquita from '../assets/vaquita.jpg'
const Sidebar = () => {
    useEffect(() => {
        let sidenav = document.querySelector('#slide-out');
        M.Sidenav.init(sidenav, {});
    }, [])
  return (
    <div>
      <nav>
        <div className="">
          <a href="#" data-target="slide-out" className="sidenav-trigger show-on-large">
            <i class="material-icons">menu</i>
          </a>
          <ul id="nav-mobile" class="right">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login" >Login</Link>
            </li>
          </ul>
        </div>
      </nav>

      <ul id="slide-out" class="sidenav">
        <li>
            <div className="user-view">
                <div className="background">
                    <img src={vaquita} width="300px" height="200px" />
                </div>
                <a href="#user"><img class="circle" src={vaquita}/></a>
                <a href="#name"><span class="white-text name">John Doe</span></a>
                <a href="#email"><span class="white-text email">jdandturk@gmail.com</span></a>
            </div> 
        </li>
        <li>
          <Link to="/listar/inventarios-vigentes" >Inventario Vigente</Link>
        </li>
        <li>
          <Link to="/listar/apartos" >Apartos</Link>
        </li>
        <li>
          <Link to="/listar/historicos">Históricos</Link> 
        </li>
      </ul>
    </div>
  );
};
export default Sidebar;

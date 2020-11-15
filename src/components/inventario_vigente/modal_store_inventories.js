import React, { useEffect } from "react";
import M from "materialize-css";
import {StoreInventories} from './store_inventories';
export const ModalAddInventories = () => {
  useEffect(() => {
      var elems = document.querySelectorAll('.modal');
      var instances = M.Modal.init(elems, {});
  }, []);
 
  return (
    <div>
         <button data-target="modal1" className="btn modal-trigger">Modal</button>
         <div id="modal1" className="modal">
          <div className="modal-content">
            <h5 className="center-align">Formulario de registro</h5>
            <StoreInventories/>
          </div>
          <div className="modal-footer">
            <button className="btn dismissible">Cerrar</button>
          </div>
        </div>
    </div>
  );
};

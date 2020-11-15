import React, {useEffect} from "react";
import M from "materialize-css";
import {ModalAddInventories} from './modal_store_inventories';
export const CurrentInventories = () => {
  useEffect(() => {
 
    
  }, []);
  return (
    <div className="container">
      <div>
        <h3 className="center-align">Inventarios Vigentes de ganado</h3>
      </div>
      <div className="right">
      <ModalAddInventories/>
      </div>
    
    </div>
  );
};

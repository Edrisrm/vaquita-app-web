import React, { useState } from "react";
import swal from "sweetalert2";
import { useForm } from "../../hooks/useForm";


import { useDispatch, useSelector } from "react-redux";
import {storeInventories} from '../../actions/inventoriesAction';
import Spinner from "../ui/Spinner/Spinner";
export const StoreInventories = () => {
    const dispatch = useDispatch();

    const loading = useSelector(state => state.inventories.loading);
    const error = useSelector(state => state.inventories.error);
    const addInventories = inventorie => dispatch( storeInventories(inventorie));

    const[formValues, handleInputChange] = useForm({
      breed: "",
      weight: "",
      age_in_months: "",
      division: "",
    })
    const {breed, weight, age_in_months, division} = formValues;

     const submitNewInventorie = e => {
         e.preventDefault();
         
         if (breed.trim() === '' || weight <= 0 
            || age_in_months.trim() === '' || division.trim() === ''    
         ) {
          swal.fire(
            'ERROR',
            'Faltan datos',
            'error'
        );
             return;
         }
         addInventories({
           breed,
           weight,
           age_in_months,
           division
         });
         console.log('Raza: '+breed+' Peso: '+weight+' Edad: '+age_in_months+' Potrero: '+division);
         
     }
  return (
    <div>
      <div className="row">
        <form className="col s12" onSubmit={submitNewInventorie}>
          <div className="row">

            <div className="input-field col s6">
            <i className="fas fa-paw prefix"></i>
              <input 
               id="icon_prefix" 
               type="text"
               className="validate" 
               name="breed" 
               value={breed} 
               onChange={handleInputChange}
               />
              <label htmlFor="icon_prefix">Raza</label>
            </div>

            <div className="input-field col s6">
            <i className="fas fa-weight prefix"></i>
              <input 
              id="icon_telephone" 
              type="number" 
              className="validate" 
              name="weight" 
              value={weight} 
              onChange={handleInputChange}
                  
              />
              <label htmlFor="icon_telephone">Peso</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
            <i className="far fa-clock prefix"></i>
              <input 
              id="icon_prefix" 
              type="text" 
              className="validate" 
              name="age_in_months" 
              value={age_in_months}
              onChange={handleInputChange}

              />
              <label htmlFor="icon_prefix">Edad en meses</label>
            </div>

            <div className="input-field col s6">
              <i className="fas fa-hat-cowboy-side prefix"></i>
              <input 
              id="icon_telephone" 
              type="text" 
              className="validate" 
              name="division" 
              value={division}
              onChange={handleInputChange}

              />
              <label htmlFor="icon_telephone">Potrero</label>
            </div>
          </div>

          <div className="row">
             <input className="col s6" type="file" name="image"/>
          </div>
          <div className="row">
                <button type="submit" className="btn btn-success center-alings">Agregar</button>
          </div>            
          {loading ? <Spinner/> : null}
          {error ? <p className="center-alings">Hubo un error</p> : null}

        </form>
      </div>
    </div>
  );
};

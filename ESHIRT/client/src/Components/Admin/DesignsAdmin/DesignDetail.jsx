import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getShirtById } from "../../../Actions/index";
import {NavLink} from 'react-router-dom';

import Style from "./DesignDetail.module.css";

export default function DesignDetail (){

const designs = useSelector((state) => state.shirtReducer.shirtId);
const dispatch = useDispatch();
console.log(designs)


    useEffect(() => {
      dispatch(getShirtById());
    }, []);

   
return(
        <div className={Style.Designs}>
<h2 className={Style.Title}>Designs waiting for approval</h2>

{designs.length >= 0 
      ? ( designs.map((shirt) => {
          return (
            <div>
              <div className={Style.Tarjet}>
                
              <h2 className={Style.Titles2}> {shirt.name}</h2>
             
            
              </div>
               </div>
          );
        })
      ) 
      : (<p>Desings not found</p>)}

   

   <NavLink to='/desings_admin'>
        <h3 className={Style.Btn3}>DESINGS</h3>
    </NavLink> 

   <NavLink to='home_admin'>
        <h3 className={Style.Btn3}>CONTROL PANEL</h3>
    </NavLink> 

        </div>
    )
}
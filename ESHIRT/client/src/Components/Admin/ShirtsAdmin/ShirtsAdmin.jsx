import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {NavLink} from 'react-router-dom';
import { getShirts } from "../../../Actions";

import Style from "./ShirtsAdmin.module.css";

export default function ShirtsAdmin() {

    
    
  
    const shirts = useSelector((state) => state.shirtReducer.allShirts);
    const dispatch = useDispatch();
  
  
    useEffect(() => {
      dispatch(getShirts());
    }, []);

    console.log("soy las shirts", shirts)


    return(
        <div className={Style.Shirts}>
            {shirts.length > 0 
      ? ( shirts.map((shirt) => {
          return (
              <div className={Style.Tarjet}>
                  
              <p className={Style.Titles1}> {shirt.id}</p>
              <p className={Style.Titles2}> {shirt.name}</p>
              <p className={Style.Titles3}> {shirt.color}</p>
              <p className={Style.Titles4}> {shirt.model}</p>
              <p className={Style.Titles5}> {shirt.size}</p>
              <p className={Style.Titles6}> {shirt.score}</p>
              <p className={Style.Titles7}> {shirt.public}</p>
              <p className={Style.Titles8}> {shirt.created_by_user}</p>
              <button className={Style.Btn1}>X</button>
              
            </div>
          );
        })
      ) 
      : (<p>Shirts not found</p>)}



<NavLink to='home_admin'>
        <h3 className={Style.Btn3}>CONTROL PANEL</h3>
    </NavLink>  
        
        </div>
    )
}
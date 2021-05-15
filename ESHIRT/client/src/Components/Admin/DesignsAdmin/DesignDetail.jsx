import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getShirtById } from "../../../Actions/index";
import {NavLink} from 'react-router-dom';
import Style from "./DesignDetail.module.css";

export default function DesignDetail (){

const shirts = useSelector((state) => state.shirtReducer.shirtId);
const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getShirtById());
    }, []);




    return(
        <div>

   <button>IMAGEN Y DETALLE DE REMER</button>

   <NavLink to='/desings_admin'>
        <h3 className={Style.Btn3}>DESINGS</h3>
    </NavLink> 

   <NavLink to='home_admin'>
        <h3 className={Style.Btn3}>CONTROL PANEL</h3>
    </NavLink> 
        </div>
    )
}
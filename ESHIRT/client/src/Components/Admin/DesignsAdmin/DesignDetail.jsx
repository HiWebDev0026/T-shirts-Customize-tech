import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getShirtById } from "../../../Actions/index";
import {NavLink} from 'react-router-dom';
import {useTokenDecode} from '../../../hooks/tokenDecoding';
import ErrorNoAdminPage from '../ErrorPages/ErrorNoAdmin';
import Style from "./DesignDetail.module.css";


export default function DesignDetail (){

const designs = useSelector((state) => state.shirtReducer.shirtId);
const dispatch = useDispatch();


const isAdmin = useTokenDecode(localStorage.currentToken);
console.log(designs)




  

   
return(
        !isAdmin ? (<ErrorNoAdminPage />) : <div className={Style.Designs}>
<h2 className={Style.Title}>Designs waiting for approval</h2>
{
        <div> 
         <p>{designs.name}</p>
         <p>{designs.color}</p>
         <img src={designs.print} />



        </div>
   
}

   

   <NavLink to='/desings_admin'>
        <h3 className={Style.Btn3}>DESINGS</h3>
    </NavLink> 

   <NavLink to='home_admin'>
        <h3 className={Style.Btn3}>CONTROL PANEL</h3>
    </NavLink> 

        </div>
    )
}
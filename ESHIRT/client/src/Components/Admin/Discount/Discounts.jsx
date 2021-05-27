import React, { useEffect, useState } from "react";
import {NavLink} from 'react-router-dom';
import Style from "./Discount.module.css";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import {useTokenDecode} from '../../../hooks/tokenDecoding';
/* import {useAdminCheck} from '../../../hooks/adminCheck' */
import ErrorNoAdminPage from '../ErrorPages/ErrorNoAdmin';

export default function Discounts() {

    const {isAuthenticated} = useAuth0();
    const isAdmin = useTokenDecode(localStorage.currentToken);
  
    

    return(
        isAdmin === null ? 'LOADING' : isAdmin === false ? (<ErrorNoAdminPage />) : 
        <div>
           
            <div className={Style.Title}>
          





            <NavLink to='home_admin'>
        <h4 className={Style.Btn3}>CONTROL PANEL</h4>
    </NavLink>  
            </div>
        </div>
    )
}
import React, { useEffect, useState } from "react";
import {NavLink} from 'react-router-dom';
import Style from "./HomeAdmin.module.css";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import {useTokenDecode} from '../../../hooks/tokenDecoding';
import ErrorNoAdminPage from '../ErrorPages/ErrorNoAdmin';
import RecicleBin from '../../../Images/recycle_bin.png';

export default function HomeAdmin() {

    const {isAuthenticated} = useAuth0();
    const isAdmin = useTokenDecode(localStorage.currentToken)
  
    console.log(isAdmin, 'hook test')

    return(
        !isAdmin ? (<ErrorNoAdminPage />) : 
        <div>
            {/* <div className={Style.General}>
            <h1>Welcome</h1>
            <h3>Please choose what you want to see on the control panel</h3>
            </div> */}
            <div className={Style.Title}>
            <NavLink to= '/users'className={Style.Title1}>
                <h2 >USERS</h2>
            </NavLink>
            <NavLink to= '/add_category' className={Style.Title1}>
                <h2>CATEGORIES</h2>
            </NavLink>
            <NavLink to= '/shirts_admin' className={Style.Title1}>
                <h2>SHIRTS</h2>
            </NavLink>
            <NavLink to= '/sales' className={Style.Title1}>
                <h2>SALES</h2>
            </NavLink>
            <NavLink to= '/desings_admin' className={Style.Title1}>
                <h2>DESIGNS</h2>
            </NavLink>
            <NavLink to= '/recycleBin' className={Style.Title1}>
                <img src={RecicleBin} className={Style.img} />
            </NavLink>
            </div>
        </div>
    )
}
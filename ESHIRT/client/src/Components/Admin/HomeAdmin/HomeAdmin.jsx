import React, { useEffect, useState } from "react";
import {NavLink} from 'react-router-dom';
import Style from "./HomeAdmin.module.css";

export default function HomeAdmin() {


    return(
        <div className={Style.Title}>

            <h1>Welcome</h1>

            <h3>Please choose what you want to see on the control panel</h3>
            
            <NavLink to= '/users'>
                <h2>USERS</h2>
            </NavLink>
            <NavLink to= '/add_category'>
                <h2>CATEGORIES</h2>
            </NavLink>
            <NavLink to= '/shirts_admin'>
                <h2>SHIRTS</h2>
            </NavLink>
            <NavLink to= '/sales'>
                <h2>SALES</h2>
            </NavLink>
            <NavLink to= '/desings_admin'>
                <h2>DESIGNS</h2>
            </NavLink>



        </div>
    )
}
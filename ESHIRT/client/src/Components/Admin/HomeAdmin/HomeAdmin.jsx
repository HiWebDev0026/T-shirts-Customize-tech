import React, { useEffect, useState } from "react";
import {NavLink} from 'react-router-dom';
import Style from "./HomeAdmin.module.css";

export default function HomeAdmin() {


    return(
        <div>
              <div className={Style.General}>
            <h1>Welcome</h1>
            <h3>Please choose what you want to see on the control panel</h3>
            </div>
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
            </div>
        </div>
    )
}
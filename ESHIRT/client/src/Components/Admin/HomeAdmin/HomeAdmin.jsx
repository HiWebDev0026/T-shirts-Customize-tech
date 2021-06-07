import React, { useEffect, useState } from "react";
import {NavLink} from 'react-router-dom';
import Style from "./HomeAdmin.module.css";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import {useTokenDecode} from '../../../hooks/tokenDecoding';
/* import {useAdminCheck} from '../../../hooks/adminCheck' */
import ErrorNoAdminPage from '../ErrorPages/ErrorNoAdmin';
import RecicleBin from '../../../Images/recycle_bin.png';
import Sales from '../../../assets/img/sales.png'
import Shirt from '../../../assets/img/shirt.png'
import Categories from '../../../assets/img/categories.png'
import Designs from '../../../assets/img/designs.png'
import Users from '../../../assets/img/users.png'
import Discounts from '../../../assets/img/discounts.png'

export default function HomeAdmin() {

    const {isAuthenticated} = useAuth0();
    const isAdmin = useTokenDecode(localStorage.currentToken);
  
    return(
        isAdmin === null ? 'LOADING' : isAdmin === false ? (<ErrorNoAdminPage />) : 
        <div className={Style.General}> 
            {/* <div className={Style.General}>
            <h1>Welcome</h1>
            <h3>Please choose what you want to see on the control panel</h3>
            </div> */}
            <div className={Style.Title}>
            <NavLink to= '/users' id='USer' className={Style.Title1}>
                <h2 >USERS</h2>
                <img src={Users} className={Style.img}/>
            </NavLink>
            <NavLink to= '/add_category' className={Style.Title1}>
                <h2>CATEGORIES</h2>
                <img src={Categories} className={Style.img}/>
            </NavLink>
            <NavLink to= '/shirts_admin' className={Style.Title1}>
                <h2>SHIRTS</h2>
                <img src={Shirt} className={Style.img}/>
            </NavLink>
            <NavLink to= '/sales' className={Style.Title1}>
                <h2>SALES</h2>
                <img src={Sales} className={Style.img}/>
            </NavLink>
            <NavLink to= '/desings_admin' className={Style.Title1}>
                <h2>DESIGNS</h2>
                <img src={Designs} className={Style.img}/>
            </NavLink>
            <NavLink to= '/discounts' className={Style.Title1}>
                <h2>DISCOUNTS</h2>
                <img src={Discounts} className={Style.img}/>
            </NavLink>
            <NavLink to= '/recycleBin' className={Style.Title1}>
                <h2>RECYCLE BIN</h2>
                <img src={RecicleBin} className={Style.img} />
    
            </NavLink>
            </div>
            <div className={Style.toShow}>
                <img src={Users} className={Style.toShowUs}/>
                <img src={Users} className={Style.toShowCat}/>
                <img src={Users} className={Style.toShowShi}/>
                <img src={Users} className={Style.toShowSal}/>
                <img src={Users} className={Style.toShowDes}/>
                <img src={Users} className={Style.toShowDis}/>
                <img src={Users} className={Style.toShowRec}/>
            </div>
        </div>
    )
}
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Style from './RecycleBin.module.css';
import {useTokenDecode} from '../../../hooks/tokenDecoding';
import ErrorNoAdminPage from '../ErrorPages/ErrorNoAdmin';
import { deleteUser, getUsers, putUser } from '../../../Actions';
import {NavLink} from 'react-router-dom';



function RecycleBin() {

    const userTotal = useSelector((state) => state.userReducer.allUsers);
    const isAdmin = useTokenDecode(localStorage.currentToken)

    return (
        !isAdmin ? (<ErrorNoAdminPage />) :
        <div className={Style.container}>
            <h1 className={Style.Title}>RECYCLE BIN </h1>
            <NavLink to='recycleBinUser'>
                <h3 className={Style.Btn3}>USERS DELETED</h3>
            </NavLink>
            <NavLink to='recycleBinShirt'>
                <h3 className={Style.Btn3}>SHIRTS DELETED</h3>
            </NavLink>
            <NavLink to='recycleBinDesigns'>
                <h3 className={Style.Btn3}>UNAPPROVED DESIGNS</h3>
            </NavLink> 
            <NavLink to='home_admin'>
                <h4 className={Style.Btn1}>CONTROL PANEL</h4>
            </NavLink>
        </div>  
    )
}

export default RecycleBin;

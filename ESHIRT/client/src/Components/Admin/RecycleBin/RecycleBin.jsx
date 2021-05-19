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
    const dispatch = useDispatch();
    let users= [];
    userTotal.map((user) => {
        if (user.status == 'deleted'){
        return users.push({
            id: user.id,
            name: user.name,
            email: user.email,
            status: user.status
        })
    }
    })
    useEffect(() => {
        dispatch(getUsers());
  }, [users]);

    function handleDelete(e) {
        alert("User " + e.target.value + "deleted");
        dispatch(deleteUser(e.target.value)); 
      };

      function handleEdit(e) {
        alert("User " + e.target.value + "restored");
        dispatch(putUser({status: 'restored'}, e.target.value)); 
      };

    return (
        !isAdmin ? (<ErrorNoAdminPage />) :
        <div>
            <h1 className={Style.Title}>RECYCLE BIN </h1>

    <NavLink to='recycleBinUser'>
    <h2 className={Style.Btn3}>USERS DELETED</h2>
    </NavLink>
    <NavLink to='recycleBinShirt'>
    <h2 className={Style.Btn3}>SHIRTS DELETED</h2>
    </NavLink>
    <NavLink to='home_admin'>
    <h4 className={Style.Btn3}>CONTROL PANEL</h4>
    </NavLink>
    


        </div>
        
    )
}


export default RecycleBin;

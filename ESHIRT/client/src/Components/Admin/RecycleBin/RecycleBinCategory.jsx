import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Style from './RecycleBin.module.css';
import {useTokenDecode} from '../../../hooks/tokenDecoding';
import ErrorNoAdminPage from '../ErrorPages/ErrorNoAdmin';
import { deleteCategory, deleteUser, getUsers, putCategory, putUser } from '../../../Actions';
import {NavLink} from 'react-router-dom';



function RecycleBinCategory() {

    const categoriesTotal = useSelector((state) => state.userReducer.allUsers);
    const isAdmin = useTokenDecode(localStorage.currentToken)
    const dispatch = useDispatch();
    let categories= [];

    categoriesTotal.map((category) => {
        if (category.status == 'deleted'){
        return categories.push({
            id: category.id,
            name: category.name,
            status: category.status
        })
    }
    })
    useEffect(() => {
        dispatch(getUsers());
  }, [categories]);

    function handleDelete(e) {
        alert("User " + e.target.value + "deleted");
        dispatch(deleteCategory(e.target.value)); 
      };

      function handleEdit(e) {
        alert("User " + e.target.value + "restored");
        dispatch(putCategory({status: 'restored'}, e.target.value)); 
      };

    return (
        !isAdmin ? (<ErrorNoAdminPage />) :
        <div>
            <h2 className={Style.Title}>Users deleted</h2>
        <div className={Style.container}>
             <div className={Style.Users}>
      {categories.length > 0 ? ( categories.map((category) => {
          return (
              <div className={Style.Tarjet}>
                <p className={Style.Titles}>{category.name}</p>
                <div className={Style.Contenedores}>
                  <button className={Style.Btn1} value={category.id} onClick={handleDelete}>X</button>
                  <button className={Style.Btn1} value={category.id} onClick={handleEdit}>Restore</button>
                </div>
            </div>
          );
        })
      ) 
      : (<p>Categories not found</p>)}
    </div>
    <NavLink to='recycleBin'>
    <h4 className={Style.Btn3}>RECYCLE BIN</h4>
    </NavLink>
    <NavLink to='home_admin'>
    <h4 className={Style.Btn3}>CONTROL PANEL</h4>
    </NavLink>
           </div>
        </div>
    )
}
export default RecycleBinCategory;
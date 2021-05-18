import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Style from './RecycleBin.module.css';
import {useTokenDecode} from '../../../hooks/tokenDecoding';
import ErrorNoAdminPage from '../ErrorPages/ErrorNoAdmin';

import {NavLink} from 'react-router-dom';
import { deleteShirt, putShirt , getShirts} from '../../../Actions';



function RecycleBinShirt() {

    const shirtsTotal = useSelector((state) => state.shirtReducer.allShirts);
    const isAdmin = useTokenDecode(localStorage.currentToken)
    const dispatch = useDispatch();
    let shirts= [];
  shirtsTotal.map((shirt) => {
      if ( shirt.status == 'deleted'){
      return shirts.push({
          id: shirt.id,
          name: shirt.name,
          color: shirt.color,
          model: shirt.model,
          size: shirt.size,
          score: shirt.score,
          public: shirt.public,
          created: shirt.created,
          status: shirt.status
      })
  }
  })

    useEffect(() => {
      dispatch(getShirts());
    }, [shirts]);

    function handleDelete(e) {
        alert("User " + e.target.value + "deleted");
        dispatch(deleteShirt(e.target.value)); 
      };

      function handleEdit(e) {
        alert("User " + e.target.value + "restored");
        dispatch(putShirt({status: 'restored'}, e.target.value)); 
      };

    return (
        !isAdmin ? (<ErrorNoAdminPage />) :
        <div>
            <h2 className={Style.Title}>Shirts deleted</h2>

            {shirts.length > 0 
      ? ( shirts.map((shirt) => {
          return (
            <tr className={Style.Container}>
              <div className={Style.Tarjet} >
              <th className={Style.Titles1}> {shirt.id}</th>
              <th className={Style.Titles2}> {shirt.name}</th>
              <th className={Style.Titles3}> {shirt.color}</th>
              <th className={Style.Titles4}> {shirt.model}</th>
              <th className={Style.Titles5}> {shirt.size}</th>
              <th className={Style.Titles6}> {shirt.score}</th>
              <th className={Style.Titles7}> {shirt.public}</th>
              <th className={Style.Titles8}> {shirt.created_by_user}</th>
              <button className={Style.Btn1} value={shirt.id} onClick={handleDelete}>X</button>
              <button className={Style.Btn1} value={shirt.id} onClick={handleEdit}>Restore</button>
              </div>
               </tr>
          );
        })
      ) 
      : (<p>Shirts not found</p>)}
      

    
    <NavLink to='home_admin'>
    <h4 className={Style.Btn3}>CONTROL PANEL</h4>
    </NavLink>


        
        </div>
    )
}


export default RecycleBinShirt;
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Style from './RecycleBinShirt.module.css';
import {useTokenDecode} from '../../../hooks/tokenDecoding';
import ErrorNoAdminPage from '../ErrorPages/ErrorNoAdmin';
import {useHistory} from 'react-router-dom'

import {NavLink} from 'react-router-dom';
import { deleteShirt, putShirt , getShirts} from '../../../Actions';

function RecycleBinShirt() {

    const shirts= useSelector((state) => state.shirtReducer.allShirts);
    const isAdmin = useTokenDecode(localStorage.currentToken);
    const [count, setCount] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
      dispatch(getShirts());
    }, [count]);

    function handleDelete(e) {

        dispatch(deleteShirt(e.target.value)); 
        setCount(count +1);
        dispatch(getShirts());
        alert("User " + e.target.value + "deleted");
        dispatch(getShirts());
       
      };

      function handleEdit(e) {
        dispatch(putShirt({status: 'restored'}, e.target.value)); 
        setCount(count + 1);
        dispatch(getShirts());
        alert("User " + e.target.value + "restored");
        dispatch(getShirts());
      };

    return (
        !isAdmin ? (<ErrorNoAdminPage />) :
        <div className={Style.General}>
          <div className={Style.TitleContainer}>
            <h2 className={Style.Title}>Shirts deleted</h2>
            </div>
            <div className={Style.Container2}>
            {shirts.length > 0 
      ? ( shirts.map((shirt) => {
        if ( shirt.status == 'deleted'){
          return (
            <div className={Style.Container}>
              <div className={Style.Tarjet} >
              <th className={Style.Titles1}> {shirt.id}</th>
              <th className={Style.Titles2}> {shirt.name}</th>
              <th className={Style.Titles3}> {shirt.color}</th>
              <button className={Style.Btn1} value={shirt.id} onClick={handleDelete}>X</button>
              <button className={Style.Btn1} value={shirt.id} onClick={handleEdit}>Restore</button>
              </div>
               </div>
          );
        }
        })
      ) 
      : (<p>Shirts not found</p>)}
    </div>
    <NavLink to='recycleBin'>
    <h4 className={Style.Btn3}>RECYCLE BIN</h4>
    </NavLink>
    <NavLink to='home_admin'>
    <h4 className={Style.Btn3}>CONTROL PANEL</h4>
    </NavLink>
        
        </div>
    )
}


export default RecycleBinShirt;
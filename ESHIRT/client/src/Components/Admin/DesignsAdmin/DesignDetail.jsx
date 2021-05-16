import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getShirtById, deleteShirt , putShirt } from "../../../Actions/index";
import {NavLink} from 'react-router-dom';
import {useTokenDecode} from '../../../hooks/tokenDecoding';
import ErrorNoAdminPage from '../ErrorPages/ErrorNoAdmin';
import {useHistory} from 'react-router-dom';
import Style from "./DesignDetail.module.css";


export default function DesignDetail (){

const designs = useSelector((state) => state.shirtReducer.shirtId);
const dispatch = useDispatch();
const history = useHistory();

function handleDelete(e) {
    alert("Design " + e.target.value + " deleted");
    dispatch(deleteShirt(parseInt(e.target.value))); 
    history.push('/desings_admin')
  };

  function handleEdit (e) {
    alert("Design " + e.target.value + " aprroved");
    dispatch(putShirt({'public':true}));
    history.push('/desings_admin');
}

const isAdmin = useTokenDecode(localStorage.currentToken);

return(
        !isAdmin ? (<ErrorNoAdminPage />) : <div className={Style.Designs}>
{
        <div className={Style.Container}> 
         <p className={Style.Name}>{designs.name}</p>
         <p className={Style.Color}>{designs.color}</p>
         <img src={designs.print} className={Style.Image}/>
         <div className={Style.Btns}>
         <button className={Style.Btn1} value={designs.id} onClick={handleDelete}>REMOVE</button>
         <button className={Style.Btn2} value={designs.id} onClick={handleEdit}>APPROVAL </button>
         </div>
        </div>
   
}

   <NavLink to='/desings_admin' >
        <h5 className={Style.Btn3}>DESINGS</h5>
    </NavLink> 

   <NavLink to='home_admin'>
        <h4 className={Style.Btn3}>CONTROL PANEL</h4>
    </NavLink> 

        </div>
    )
}
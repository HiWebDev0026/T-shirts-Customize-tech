import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import {HiShoppingCart} from "react-icons/hi";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";


import {deleteFavorite,pushItem} from '../../Actions/index.js';
import Popup from './Popup.jsx';

import Style from './FavoritesItems.module.css'

export default function FavoritesItems ({favorite}) {

    const {user, isAuthenticated}=useAuth0();

    const userId = user.sub.split('|')[1]
    
    const [buttonPopup, setButtonPopup]=useState(false);

    const dispatch=useDispatch();

    function handleDelete(e){
        dispatch(deleteFavorite(userId,{shirtId:e.target.id}));
    }

    return(
        <div className={Style.card}>
          <main>
            <img src={favorite.print} alt={favorite.name}/>
            <h5 className={Style.name}>{favorite.name}</h5>
            <div className={Style.btns}>
                <h5>${favorite.price}</h5>
                <button id={favorite.id} onClick={handleDelete} >delete</button>
                <button id={favorite.id} onClick={()=>setButtonPopup(true)} ><HiShoppingCart/></button>
            </div>
          </main>
                <Popup favorite={favorite} trigger={buttonPopup} setTrigger={setButtonPopup}/>
        </div>  
    )
}
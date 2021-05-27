import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import {HiShoppingCart} from "react-icons/hi";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";


import {deleteFavorite} from '../../Actions/index.js';
import {MdDeleteForever} from "react-icons/md";
import Popup from './Popup.jsx';

import Style from './FavoritesItems.module.css'

export default function FavoritesItems ({favorite}) {

    const {user, isAuthenticated,loginWithPopup}=useAuth0();

    const userId = user.sub.split('|')[1]
    
    const [buttonPopup, setButtonPopup]=useState(false);

    const dispatch=useDispatch();

    function handleDelete(e, id){
        e.preventDefault();
        if(isAuthenticated){
            dispatch(deleteFavorite(userId,{shirtId:id}));
        }else{
            loginWithPopup();
        }
    }

    return(
        <div className={Style.card}>
          <main>
            <img src={favorite.print} alt={favorite.name}/>
            <h5 className={Style.name}>{favorite.name}</h5>
            <h5 className={Style.price}>${favorite.price}</h5>
            <div className={Style.btns}>
                <button id={favorite.id} onClick={(e) => handleDelete(e, favorite.id)} ><MdDeleteForever/></button>
                <button id={favorite.id} onClick={()=>setButtonPopup(true)} ><HiShoppingCart/></button>
            </div>
          </main>
                <Popup favorite={favorite} trigger={buttonPopup} setTrigger={setButtonPopup}/>
        </div>  
    )
}
import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import {HiShoppingCart} from "react-icons/hi";


import {deleteFavorite,pushItem} from '../../Actions/index.js';
import Popup from './Popup.jsx';

import Style from './FavoritesItems.module.css'

export default function FavoritesItems ({favorite}) {

    const [buttonPopup, setButtonPopup]=useState(false);

    const dispatch=useDispatch();

    function handleDelete(e){
        console.log('ID',e.target.id)
        dispatch(deleteFavorite('105677628845670307414',{shirtId:e.target.id}));
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
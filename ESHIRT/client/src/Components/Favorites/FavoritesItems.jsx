import React from 'react';
import {useDispatch} from 'react-redux';
import {FaCartPlus,FaTrashAlt} from "react-icons/fa";

import {deleteFavorite,pushItem} from '../../Actions/index.js';

import Style from './FavoritesItems.module.css'

export default function FavoritesItems ({favorite}) {
    const dispatch=useDispatch();

    function handleDelete(e){
        dispatch(deleteFavorite('105677628845670307414',{shirtId:e.target.id}));
    }

    function handleAdd(e){
        console.log('ITEM', favorite)
        dispatch(pushItem({...favorite, image:favorite.print}))
    }

    return(
        <div className={Style.card}>
            <img src={favorite.print} alt={favorite.name}/>
            <h5 className={Style.name}>{favorite.name}</h5>
            <h5>{favorite.price}</h5>
            <div className={Style.btns}>
                <button id={favorite.id} onClick={handleDelete}>delete</button>
                <button id={favorite.id} onClick={handleAdd}>add to cart</button>
            </div>
        </div>
        
    )
}
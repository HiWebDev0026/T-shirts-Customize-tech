import React,{useEffect,useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    postOrder,
    putOrder,
    setCartItems,
    setSizeChanged,
    postFavorite
} from '../../Actions/index.js'

import { BsFillHeartFill,BsFillTrashFill } from 'react-icons/bs';
//import { FaEdit } from "react-icons/fa";
import { useAuth0} from "@auth0/auth0-react";


import Style from './CartItem.module.css'

export default function CartItem ({item, index}){

    const dispatch = useDispatch();
    const items = useSelector(state => state.cartReducer.items)
    const orderId = useSelector(state => state.ordersReducer.orderId)
    const {isAuthenticated, user, loginWithPopup} = useAuth0();

    const sizes=['S','M','L','XL'];
  
    const handleCartChange = (e, operation, trash) => {
        e.preventDefault();
        let auxOperation = null
        if (isAuthenticated && orderId > 0) {
            if (operation === '+') {
                auxOperation = 'add'
            } else if (operation === '-') {
                auxOperation = 'remove'
            }
            const actualAmount = item.amount
            dispatch(putOrder([...items.map(i => { return {...i}}), {...item, amount: (trash && actualAmount) || 1}], orderId, auxOperation))
        } else if (isAuthenticated && orderId === 0) {
            dispatch(postOrder([...items, item], user.sub.split('|')[1]))
        }
        dispatch(setCartItems({ 
            ...item, 
            amount: (trash && item.amount) || 1
        }, operation));
    }

    const handleSizeChange = (e)  => {
        e.preventDefault();
        item.size = e.target.value;
        dispatch(setSizeChanged(item, e.target.id))
    }

    const handleFavorite =(e) => {
        e.preventDefault();
        if(isAuthenticated){
            dispatch(postFavorite(user.sub.split('|')[1],{shirtId:item.id}));
        }else{
            loginWithPopup();
        }
    }

    return(
        <li className={Style.cartCard}> 
            <div className={Style.picture}>
                <img src={item.image} alt={item.title} className={Style.image}/>
            </div>
            <div className={Style.column1}>
                <div className={Style.detail}>
                    <div className={Style.name}>{item.title}</div>
                        <div className={Style.sku}>SKU:{item.id}</div>
                    </div>
                    <div className={Style.btns}>
                        <button onClick={(e) => handleCartChange(e, '-', 'trash')}><BsFillTrashFill/></button>
                        <button onClick={handleFavorite} className={isAuthenticated?Style.blackHeart:Style.greyHeart}><BsFillHeartFill/></button>                     
                    </div>
                </div>
            <div className={Style.column2}>
                <div className={Style.price}>${item.price}</div>
            </div>
            <div className={Style.column3}>
                <div className={Style.size}>
                    <select name='size' onChange={(e) => handleSizeChange(e)}required>
                            {
                                sizes.map((s)=>{
                                    return item.size === s?
                                        <option value={item.size} selected>{s}</option>
                                        : <option value={s}>{s}</option>
                                })  
                            }
                    </select>
                </div>
                <div className={Style.amount}>
                    <button id= {index} onClick={(e) => handleCartChange(e, '+')}>+</button>
                    <div className={Style.qty}>{item.amount}</div>
                    <button id= {index} onClick={(e) => handleCartChange(e, '-')}>-</button>
                </div>
            </div>
        </li>
    )
}
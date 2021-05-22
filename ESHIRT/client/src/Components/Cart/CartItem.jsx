import React,{useEffect,useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    postOrder,
    putOrder,
    checkLastOrder,
    setCartItems,
    setSizeChanged
} from '../../Actions/index.js'

import { BsFillHeartFill,BsFillTrashFill } from 'react-icons/bs';
import { FaEdit } from "react-icons/fa";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";


import Style from './CartItem.module.css'

export default function CartItem ({item, index}){

    const dispatch = useDispatch();
    const items = useSelector(state => state.cartReducer.items)
    // const orderId = useSelector(state => state.ordersReducer.orderId)
    // const isPosting = useSelector(state => state.ordersReducer.postStarted)
    // const orderIdChecked = useSelector(state => state.ordersReducer.lastOrderChecked)
    // const {isAuthenticated, getAccessTokenSilently, user } = useAuth0();

    const sizes=['S','M','L','XL'];
  
//     useEffect(() => {
//         if (isAuthenticated && !orderIdChecked && !isPosting) {
//         dispatch(checkLastOrder(user.sub.split('|')[1]))
//         }

//     if (isAuthenticated && orderId === 0 && !isPosting) {
//       dispatch(postOrder(cart, user.sub.split('|')[1]))
//     } else if (isAuthenticated && orderId) {
//       dispatch(putOrder(cart, orderId))
//     }
  
//   }, [cart, isPosting])



    const handleCartChange = (e, operation) => {
        e.preventDefault();
        const item = (e.target.id && items[parseInt(e.target.id)]) || {}
        dispatch(setCartItems({ 
            ...item, 
            amount: 1
        }, operation))
    }

    const handleSizeChange = (e)  => {
        e.preventDefault();
        item.size = e.target.value;
        dispatch(setSizeChanged(item, e.target.id))
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
                        <button onClick={(e) => handleCartChange(e, 'clear')}><BsFillTrashFill/></button>
                        <button><BsFillHeartFill/></button>                     
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
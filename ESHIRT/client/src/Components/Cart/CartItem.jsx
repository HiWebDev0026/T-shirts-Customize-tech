import React,{useEffect,useState,useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    deleteItem, 
    addOne, 
    outOne,
    changeSize,
    postOrder,
    putOrder,
    checkLastOrder
} from '../../Actions/index.js'

import { BsFillHeartFill,BsFillTrashFill } from 'react-icons/bs';
import { FaEdit } from "react-icons/fa";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";


import Style from './CartItem.module.css'

export default function CartItem ({it}){

    const dispatch = useDispatch();
    const cart = useSelector(state => state.cartReducer.items)
    const orderId = useSelector(state => state.ordersReducer.orderId)
    const isPosting = useSelector(state => state.ordersReducer.postStarted)
    const orderIdChecked = useSelector(state => state.ordersReducer.lastOrderChecked)
    const {isAuthenticated, getAccessTokenSilently, user } = useAuth0();
    
    const plus= useRef(null)
    const minus= useRef(null)

    let sizes=['S','M','L','XL'];
  
    useEffect(() => {
        if (isAuthenticated && !orderIdChecked && !isPosting) {
        dispatch(checkLastOrder(user.sub.split('|')[1]))
        }

    if (isAuthenticated && orderId === 0 && !isPosting) {
      dispatch(postOrder(cart, user.sub.split('|')[1]))
    } else if (isAuthenticated && orderId) {
      dispatch(putOrder(cart, orderId))
    }
  
  }, [cart, isPosting])

    
    function handlePlus(e){
        dispatch(addOne(e.target.id))
    }

    function handleMinus(e){
        dispatch(outOne(e.target.id))
    }

    function deleteHandler (e){
        dispatch(deleteItem(it.index));   
    }

    function sizeChangeHandler(e){
        console.log('ID', it.id)
        let newSize=e.target.value;
        console.log('NEWSIZE', newSize)
        it.size=newSize;
        console.log('NEWITEM', it.size)
        console.log('ITEM', it)
        dispatch(changeSize(it));
    }

    return(
        <li className={Style.cartCard}> 
            <div className={Style.picture}>
                <img src={it.image} alt={it.title} className={Style.image}/>
            </div>
            <div className={Style.column1}>
                <div className={Style.detail}>
                    <div className={Style.name}>{it.title}</div>
                        <div className={Style.sku}>SKU:{it.id}</div>
                    </div>
                    <div className={Style.btns}>
                        <button onClick={deleteHandler}><BsFillTrashFill/></button>
                        <button><BsFillHeartFill/></button>                     
                    </div>
                </div>
            <div className={Style.column2}>
                <div className={Style.price}>${it.price}</div>
            </div>
            <div className={Style.column3}>
                <div className={Style.size}>
                    <select name='size' onChange={sizeChangeHandler}required>
                            {
                                sizes.map((s)=>{
                                    return it.size === s?
                                        <option value={it.size} selected>{s}</option>
                                        : <option value={s}>{s}</option>
                                })  
                            }
                    </select>
                </div>
                <div className={Style.amount}>
                    <button id= {it.index} onClick={handlePlus}>+</button>
                    <div className={Style.qty}>{it.amount}</div>
                    <button id= {it.index} onClick={handleMinus}>-</button>
                </div>
            </div>
        </li>
    )
}
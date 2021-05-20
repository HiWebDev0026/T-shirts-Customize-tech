import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useState, useEffect} from 'react'
import { useAuth0} from "@auth0/auth0-react";
import {NavLink} from 'react-router-dom';

import { 
    addOne, 
    clear, 
    outOne, 
    postOrder,
    putOrder,
    checkLastOrder 
} from '../../Actions/index';
import style from './SideCart.module.css'




export function SideCart(){ 
    let total= 0
    const dispatch= useDispatch()
    
    const items= useSelector(state => state.cartReducer.items)
    const cart = useSelector(state => state.cartReducer.items)
    const orderId = useSelector(state => state.ordersReducer.orderId)
    const isPosting = useSelector(state => state.ordersReducer.postStarted)
    const orderIdChecked = useSelector(state => state.ordersReducer.lastOrderChecked)
    const {isAuthenticated, getAccessTokenSilently, user } = useAuth0();
  
    useEffect(() => {
        if (isAuthenticated && !orderIdChecked && !isPosting) {
            dispatch(checkLastOrder(user.sub.split('|')[1]))
        }

        if (isAuthenticated && orderId === 0 && !isPosting) {
            dispatch(postOrder(cart, user.sub.split('|')[1]))
        } else if (isAuthenticated && orderId) {
            console.log(localStorage)
            dispatch(putOrder(cart, orderId))
        }
    }, [cart, isPosting])


    function handlePlus(e){
        dispatch(addOne(e.target.id))
    }

    function handleMinus(e){
        dispatch(outOne(e.target.id))
    }

    function handleClear(){
        dispatch(clear())
    }
    
    return (
        <div className={style.container}>
            <div className={style.items}>
                <h2>You have {items.reduce((a,c)=>a+c.amount,0)} items in your cart</h2>
                <button className={style.cartBtnC}  onClick={handleClear} >Clear cart</button>
                {items?.map(item => {
                    total += (item.price * item.amount)
                    return(
                        
                        <div className={style.item}>
                            <div className={style.data}>
                                <h4>{item.title}</h4>
                                <h4>{item.size}</h4>

                                U$S{item.price}x{item.amount}

                            </div>
                            <div className={style.ctrls}>
                            <img src={item.image}/>
                            <div className={style.amount}>
                                <button id= {item.index} onClick={handlePlus}>+1</button>
                                <button id= {item.index} onClick={handleMinus}>-1</button>
                            </div>
                            </div>

                        </div>
                    )
                    })
                } 
            </div>
            <div className={style.total}>
                TOTAL: U$S{total}
            </div>
            <NavLink to='/cart'>
                <button className={style.cartBtnP}>Proceed</button>
            </NavLink>
        </div>
    )
}
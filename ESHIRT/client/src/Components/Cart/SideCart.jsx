import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import { useAuth0} from "@auth0/auth0-react";
import {NavLink} from 'react-router-dom';

import { 
    putOrder,
    setCartItems,
    checkLastOrder 
} from '../../Actions/index';
import style from './SideCart.module.css'


export function SideCart(){ 
    let total= 0
    const dispatch= useDispatch()

    const items= useSelector(state => state.cartReducer.items)
    const cart = useSelector(state => state.cartReducer.items)
    const orderId = useSelector(state => state.ordersReducer.orderId)
    const {isAuthenticated, user, loginWithPopup} = useAuth0();
    const shirts = useSelector((state)=>state.shirtReducer.allShirts);


    
    const handleCartChange = (e, operation) => {
        e.preventDefault();
        const item = (e.target.id && items[parseInt(e.target.id)]) || {}
        let auxOperation = null
        if (isAuthenticated) {
            if (operation === '+') {
                auxOperation = 'add'
            } else if (operation === '-') {
                auxOperation = 'remove'
            } else {
                auxOperation = 'clear'
            }
            dispatch(putOrder([...cart.map(i => { return {...i}}), {...item, amount: 1}], orderId, auxOperation))
        } 
        dispatch(setCartItems({ 
            ...item, 
            amount: 1
        }, operation));
    }

    const showProceed = () => {
        return (
            <NavLink to={'cart/'}>
                <button className={style.cartBtnP}>Proceed</button>
            </NavLink>
        )
    }

    const showLogAndProceed = (loginWithPopup) => {

        return (
            <div>
                <button className={style.cartBtnP} onClick={loginWithPopup}>Login and Proceed</button>
            </div>
        )
    }

    useEffect(()=> {
        if (isAuthenticated) {
            dispatch(checkLastOrder(user.sub.split('|')[1]))
        }
  
      
}, [isAuthenticated])


    return (
        <div className={style.container}>
            <div className={style.items}>
                <h2>You have {items.reduce((a,c)=>a+c.amount,0)} items in your cart</h2>
                <button className={style.cartBtnC}  onClick={(e) => handleCartChange(e, 'clear')} >Clear cart</button>
                {items?.map((item, index)=> {
                    let shirt ={}
                    if(!item.hasOwnProperty('image')){
                        shirt = shirts.find(shirt=> shirt.id === item.id)
                        item.image = shirt.print;
                    }
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
                                <button id= {index} onClick={(e) => handleCartChange(e, '+')}>+1</button>
                                <button id= {index} onClick={(e) => handleCartChange(e, '-')}>-1</button>
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
            {isAuthenticated ? showProceed() : showLogAndProceed(loginWithPopup)}
        </div>
    )
}
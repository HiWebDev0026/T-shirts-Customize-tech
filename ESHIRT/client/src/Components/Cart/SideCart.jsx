import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import { useAuth0} from "@auth0/auth0-react";
import {NavLink} from 'react-router-dom';

import { BsFillHeartFill } from 'react-icons/bs';

import { 
    putOrder,
    setCartItems,
    checkLastOrder,
    postOrder,
    postFavorite
} from '../../Actions/index';
import style from './SideCart.module.css'


export function SideCart(){ 
    let total= 0
    const dispatch= useDispatch()

    const items= useSelector(state => state.cartReducer.items)
    const orderId = useSelector(state => state.ordersReducer.orderId)
    const {isAuthenticated, user, loginWithPopup} = useAuth0();
    const shirts = useSelector((state)=>state.shirtReducer.allShirts);
    
    const handleCartChange = (e, operation) => {
        e.preventDefault();
        const item = (e.target.id && items[parseInt(e.target.id)]) || {}
        let auxOperation = null
        if (orderId > 0) {
            if (operation === '+') {
                auxOperation = 'add'
            } else if (operation === '-') {
                auxOperation = 'remove'
            } else {
                auxOperation = 'clear'
            }
            dispatch(putOrder([...items.map(i => { return {...i}}), {...item, amount: 1}], orderId, auxOperation))
        } else if (orderId === 0) {
            alert(orderId)
            dispatch(postOrder([...items, item], user.sub.split('|')[1]))
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

    const handleFavorite =(e) => {
        console.log('IND', e.target.id)
        e.preventDefault();
        // if(isAuthenticated){
        //     dispatch(postFavorite(user.sub.split('|')[1],{shirtId:e.target.id}));
        // }else{
        //     loginWithPopup();
        // }
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
                        item.image = shirt?.print || 'https://assets.stickpng.com/thumbs/580b57fbd9996e24bc43bf76.png';
                    }
                    total += (item.price * item.amount)
                    return(
                        
                        <div className={style.item}>
                            <div className={style.data}>
                                <h4>{item.title}</h4>
                                <h4>{item.size}</h4>

                                U$S{item.price}x{item.amount}
                                {/* <button id={item.id} onClick={handleFavorite} className={isAuthenticated?style.blackHeart:style.greyHeart}><BsFillHeartFill/></button>  */}

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
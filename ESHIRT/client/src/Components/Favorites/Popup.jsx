import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {GrAdd, GrFormSubtract} from "react-icons/gr";
import {HiShoppingCart} from "react-icons/hi";
import {RiCloseLine} from "react-icons/ri";
import swal from 'sweetalert';
import { useAuth0} from "@auth0/auth0-react";
import Style from './Popup.module.css';
import {setCartItems,postOrder,putOrder } from '../../Actions/index.js';


export default function Popup (props){

    const {user, isAuthenticated}=useAuth0();
    const userId = user.sub.split('|')[1]

    const[quantity,setQuantity]=useState(1);
    const[size, setSize]=useState(props.favorite.size || '');

    const cart =useSelector(state =>state.cartReducer.items);
    const orderId=useSelector(state =>state.ordersReducer.orderId);

    const sizes=['S','M','L','XL'];

    const dispatch=useDispatch();

    const handleCartChange = (e) => {
        e.preventDefault();
        const item = {
        title:props.favorite.name,
        price:props.favorite.price,
        size: size,
        image:props.favorite.print,
        id: props.favorite.id,
        amount: quantity
        }
        console.log(`Test${JSON.stringify(item)}`);
        dispatch(setCartItems(item, '+'));

        if (isAuthenticated && !orderId) {
        dispatch(postOrder([...cart, item], userId))
        } else if (isAuthenticated && orderId) {
        dispatch(putOrder([...cart, item], orderId, 'add'));
        }
        props.setTrigger(false)
        swal({title:'added to cart', icon:'success', timer:3000})
    }
    
    return (props.trigger)?(
        <div className={Style.popup}>
            <div className={Style.popupinner}>
                <div className={Style.left}>
                    <div className={Style.image}>
                        <img src={props.favorite.print}/>
                    </div>
                    <p>{props.favorite.name}</p>
                </div>
                <div className={Style.right}>
                    <label className={Style.size}>
                            <select className={Style.size} onChange={(e)=>setSize(e.target.value)}>
                            {
                                sizes.map((s)=>{
                                    return props.favorite.size === s?
                                        <option value={props.favorite.size} selected>{s}</option>
                                        : <option value={s}>{s}</option>
                                })  
                            }
                            </select>
                    </label>
                    <div className={Style.amount}>
                        <button className={Style.buttonAM} onClick={()=>setQuantity(quantity+1)}>
                            <GrAdd />
                        </button>
                        <div className={Style.amountqt}>{quantity}</div>
                        <button className={Style.buttonAM} onClick={()=>quantity>1&&setQuantity(quantity-1)}>
                            <GrFormSubtract />
                        </button>
                    </div>
                            <button id={props.id} onClick={(e) => handleCartChange(e)} className={Style.cart}><HiShoppingCart/></button>
                </div>
                <button className={Style.closebtn} onClick={()=>props.setTrigger(false)}><RiCloseLine/></button>
            </div>
        </div>
    ):'';
}
import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import {GrAdd, GrFormSubtract} from "react-icons/gr";
import {HiShoppingCart} from "react-icons/hi";
import swal from 'sweetalert';

import Style from './Popup.module.css';
import {pushItem} from '../../Actions/index.js';

export default function Popup (props){

    const[amount,setAmount]=useState(1);
    const[size, setSize]=useState('');

    const dispatch=useDispatch();

    function handleAdd (e){
        console.log('ITEM', props.favorite)
        dispatch(pushItem({...props.favorite, image:props.favorite.print, price:50, amount:amount, size:size}))
        props.setTrigger(false)
        swal({title:'added to cart', icon:'success', timer:3000})
    }
    
    return (props.trigger)?(
        <div className={Style.popup}>
            <div className={Style.popupinner}>
                <div className={Style.image}>
                    <img src={props.favorite.print}/>
                </div>
                <p>{props.favorite.name}</p>
                <label>
                        <select className={Style.size} onChange={(e)=>setSize(e.target.value)}>
                          <option selected="true" disabled="disabled">size</option>
                          <option value="XL">XL</option>
                          <option value="L">L</option>
                          <option value="M">M</option>
                          <option value="S">S</option>
                        </select>
                        </label>
                        <div>
                            <button className={Style.buttonAM} onClick={()=>setAmount(amount+1)}>
                            <GrAdd />
                            </button>
                            <div>{amount}</div>
                            <button className={Style.buttonAM} onClick={()=>amount>1&&setAmount(amount-1)}>
                            <GrFormSubtract />
                            </button>
                        </div>
                        <button id={props.id} onClick={handleAdd} ><HiShoppingCart/></button>
                        <button className={Style.closebtn} onClick={()=>props.setTrigger(false)}>close</button>
            </div>
        </div>
    ):'';
}
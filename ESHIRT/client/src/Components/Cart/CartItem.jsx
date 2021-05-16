import React,{useEffect,useState,useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {deleteItem, addOne, outOne,changeSize} from '../../Actions/index.js'

import { BsFillHeartFill,BsFillTrashFill } from 'react-icons/bs';
import { FaEdit } from "react-icons/fa";



import Style from './CartItem.module.css'

export default function CartItem ({it}){

    const dispatch = useDispatch();
    const plus= useRef(null)
    const minus= useRef(null)

    let sizes=['S','M','L','XL'];
    
    function handlePlus(){
        dispatch(addOne(parseInt(plus.current.value)))
    }

    function handleMinus(){
        dispatch(outOne(parseInt(minus.current.value)))
    }

    function deleteHandler (e){
        dispatch(deleteItem(it.id));   
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
                        <button id={it.id} onClick={deleteHandler}><BsFillTrashFill/></button>
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
                    <button value= {it.id} onClick={handlePlus} ref={plus}>+</button>
                    <div className={Style.qty}>{it.amount}</div>
                    <button value= {it.id} onClick={handleMinus} ref={minus}>-</button>
                </div>
            </div>
        </li>
    )
}
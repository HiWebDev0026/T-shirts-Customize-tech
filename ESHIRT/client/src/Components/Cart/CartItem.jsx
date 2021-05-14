import React,{useEffect,useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {deleteItem, addOne, outOne} from '../../Actions/cart.js'

import { BsFillHeartFill,BsFillTrashFill } from 'react-icons/bs';
import { FaEdit } from "react-icons/fa";



import Style from './CartItem.module.css'

export default function CartItem ({it}){

    const[input,setInput] =useState(it.amount);
    const[size,setSize] =useState(it.size);

    const dispatch = useDispatch();
    
    let sizes=['S','M','L','XL'];

    function changeHandler (e){
       let id=e.target.id;
       console.log('IDDD', id);
        setInput(e.target.value);
        console.log('VAL', input);
        if (input>it.amount){
            dispatch(addOne(id));
        }else if(input<it.amount){
            dispatch(outOne(id));
        }
        
    }

    function deleteHandler (e){
        let id=e.currentTarget.id;
        console.log('IDDELETE', id);
        dispatch(deleteItem(it.id));   
    }

    function sizeChangeHandler(e){
        let id=e.target.id;
        console.log('IDSIZE', id);
        let newSize=e.target.value;
        console.log('CAMBIO',newSize);
        setSize(newSize);
        // changeSize()
    }
    console.log('NEWSIZE',size);

    return(
        <li className={Style.cartCard}> 
            <div className={Style.picture}>
                <img src={it.print} alt={'product'+ it.id} className={Style.image}/>
            </div>
            <div className={Style.column1}>
                <div className={Style.detail}>
                    <div className={Style.name}>{it.name}</div>
                        <div className={Style.sku}>SKU:{it.id}</div>
                    </div>
                    <div className={Style.btns}>
                        <button id={it.id} onClick={deleteHandler}><BsFillTrashFill/></button>
                        <button><BsFillHeartFill/></button>
                                {/* <Link to='/design'> */}
                                    <button><FaEdit/></button>
                                {/* </Link> */}                     
                    </div>
                </div>
            <div className={Style.column2}>
                <div className={Style.price}>${it.price}</div>
            </div>
            <div className={Style.column3}>
                <div className={Style.size}>
                    <select name='size' id={it} onChange={sizeChangeHandler}required>
                            {
                                sizes.map((s)=>{
                                    return size === s?
                                        <option value={size} selected>{s}</option>
                                        : <option value={s}>{s}</option>
                                })  
                            }
                    </select>
                </div>
                <div>
                    <input min='1' type='number' id={it.id} name='amount' value={input} onChange={changeHandler} className={Style.size}></input>
                </div>
            </div>
        </li>
    )
}
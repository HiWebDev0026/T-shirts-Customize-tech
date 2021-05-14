import React from 'react'
import style from './SideCart.module.css'
import {useDispatch, useSelector} from 'react-redux'
import {useState, useEffect} from 'react'
import { addOne, changeSize, deleteItem, outOne, pushItem } from '../../Actions/cart'
import {NavLink} from 'react-router-dom'

export function SideCart(){
    let total= 0
    const dispatch= useDispatch()
    const items= useSelector(state => state.cartReducer.items)
    
    
    console.log(items)

    /////////////////// ESTO ES PARA TESTEO //////////

    /* function handleAdd(){
        dispatch(pushItem({
            name: 'Ema',
            id: 2,
            price: 100,
            size: 'XL',
            amount: 3
        }))
    }

    function handleAdd2(){
        dispatch(pushItem({
            name: 'Ger',
            id: 3,
            price: 200,
            size: 'L',
            amount: 1
        }))
    }

    function handleAddOneEma(){
        dispatch(changeSize({
            name: 'Ema',
            id: 2,
            price: 100,
            size: 'M',
            amount: 3
        }))
    }

    function handleAddOneGer(){
        dispatch(changeSize({
            name: 'Ger',
            id: 3,
            price: 200,
            size: 'S',
            amount: 1
            
        }))
    }

    function handleDeleteEma(){
        dispatch(outOne(2))
    }

    function handleDeleteGer(){
        dispatch(outOne(3))
    } */
////////////////////////////////////////////////
    return (
        <div>
            <div className={style.items}>
                <h2>You have {items.length} items in your cart</h2>
                
                {items?.map(item => {
                    console.log(item.price)
                    total += (item.price * item.amount)
                    return(
                        
                        <div className={style.item}>
                            <div className={style.data}>
                                <h4>{item.title}</h4>
                                <h4>{item.size}</h4>

                                U$S{item.price}x{item.amount}

                            </div>
                            <img src={item.print}/>
                        </div>
                    )
                    })
                } 
            </div>
            <div className={style.total}>
                TOTAL: U$S{total}
            </div>
            <NavLink to='/cart'>
                <button>Proceed</button>
            </NavLink>
            
            {/* ////////// ESTO ES PARA TESTEO /////////// */}
            
            {/* <div>
                <button onClick={handleAdd}>ADD</button>
                <button onClick={handleAddOneEma}>changeSizeEma</button>
                <button onClick={handleAdd2}>ADD2</button>
                <button onClick={handleAddOneGer}>changeSizeGer</button>
                <button onClick={handleDeleteEma}>DELETEema</button>
                <button onClick={handleDeleteGer}>DELETE2ger</button>
            </div> */}
        </div>
    )
}
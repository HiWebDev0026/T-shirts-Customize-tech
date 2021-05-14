import React from 'react'
import style from './SideCart.module.css'
import {useDispatch, useSelector} from 'react-redux'
import {useState, useEffect, useRef} from 'react'
import { addOne, outOne } from '../../Actions/index'
import {NavLink} from 'react-router-dom'

export function SideCart(){
    let total= 0
    const dispatch= useDispatch()
    const items= useSelector(state => state.cartReducer.items)
    const plus= useRef(null)
    const minus= useRef(null)

    function handlePlus(){
        dispatch(addOne(parseInt(plus.current.value)))
    }

    function handleMinus(){
        dispatch(outOne(parseInt(minus.current.value)))
    }
    
    console.log(items, 'leido desde el reducer')
    return (
        <div>
            <div className={style.items}>
                <h2>You have {items.length} items in your cart</h2>
                
                {items?.map(item => {
                    total += (item.price * item.amount)
                    return(
                        
                        <div className={style.item}>
                            <div className={style.data}>
                                <h4>{item.title}</h4>
                                <h4>{item.size}</h4>

                                U$S{item.price}x{item.amount}

                            </div>
                            <img src={item.print}/>
                            <div>
                                <button value= {item.id} onClick={handlePlus} ref={plus}>+1</button>
                                <button value= {item.id} onClick={handleMinus} ref={minus}>-1</button>
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
                <button>Proceed</button>
            </NavLink>
        </div>
    )
}
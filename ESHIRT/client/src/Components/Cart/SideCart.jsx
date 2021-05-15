import React from 'react'
import style from './SideCart.module.css'
import {useDispatch, useSelector} from 'react-redux'
import {useState, useEffect} from 'react'
import { addOne, clear, outOne } from '../../Actions/index'
import {NavLink} from 'react-router-dom'

export function SideCart(){
    let total= 0
    const dispatch= useDispatch()
    const items= useSelector(state => state.cartReducer.items)

    function handlePlus(e){
        dispatch(addOne(e.target.id))
    }

    function handleMinus(e){
        dispatch(outOne(e.target.id))
    }

    function handleClear(){
        dispatch(clear())
    }
    
    console.log(items, 'leido desde el reducer')
    return (
        <div>
            <div className={style.items}>
                <h2>You have {items.length} items in your cart</h2>
                <button onClick={handleClear} >Clear cart</button>
                {items?.map(item => {
                    total += (item.price * item.amount)
                    return(
                        
                        <div className={style.item}>
                            <div className={style.data}>
                                <h4>{item.title}</h4>
                                <h4>{item.size}</h4>

                                U$S{item.price}x{item.amount}

                            </div>
                            <img src={item.image}/>
                            <div>
                                <button id= {item.index} onClick={handlePlus}>+1</button>
                                <button id= {item.index} onClick={handleMinus}>-1</button>
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
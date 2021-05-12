import React from 'react'
import style from './SideCart.module.css'
import {useDispatch, useSelector} from 'react-redux'
import {useState, useEffect} from 'react'
import { addOne, deleteItem, pushItem } from '../../Actions/cart'


export function SideCart(){
    const [total, setTotal]= useState(0)
    const dispatch= useDispatch()
    const items= useSelector(state => state.cartReducer.items)
    
    
    console.log(items)

    /////////////////// ESTO ES PARA TESTEO //////////

    function handleAdd(){
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

    function handleAddOne1(){
        dispatch(addOne(2))
    }

    function handleAddOne2(){
        dispatch(addOne(3))
    }

    function handleDelete(){
        dispatch(deleteItem(2))
    }

    function handleDelete2(){
        dispatch(deleteItem(3))
    }
////////////////////////////////////////////////
    return (
        <div>
            <div className={style.items}>
                <h2>You have {items.length} items in your cart</h2>
                {items => items.map(item => {
                    console.log(item.price)
                    setTotal(total + item.price)
                    return(
                        
                        <div className={style.item}>
                            <div className={style.data}>
                                <h4>{item.name}</h4>
                                <h4>{item.size}</h4>

                                ${item.price}x{item.amount}

                            </div>
                            <img src={item.print}/>
                        </div>
                    )
                    })
                } 
            </div>
            <div className={style.total}>
                TOTAL: {total}
            </div>
            
            {/* ////////// ESTO ES PARA TESTEO /////////// */}
            
            <div>
                <button onClick={handleAdd}>ADD</button>
                <button onClick={handleAddOne1}>ADDone(to1)</button>
                <button onClick={handleAdd2}>ADD2</button>
                <button onClick={handleAddOne2}>ADDone(to2)</button>
                <button onClick={handleDelete}>DELETE</button>
                <button onClick={handleDelete2}>DELETE2</button>
            </div>
        </div>
    )
}
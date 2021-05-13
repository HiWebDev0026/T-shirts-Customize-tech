import React from 'react'
import style from './SideCart.module.css'
import {useDispatch, useSelector} from 'react-redux'
import {useState, useEffect} from 'react'
import { addOne, deleteItem, outOne, pushItem } from '../../Actions/cart'


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

    function handleAddOneEma(){
        dispatch(addOne(2))
    }

    function handleAddOneGer(){
        dispatch(addOne(3))
    }

    function handleDeleteEma(){
        dispatch(outOne(2))
    }

    function handleDeleteGer(){
        dispatch(outOne(3))
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
                <button onClick={handleAddOneEma}>ADDoneEma</button>
                <button onClick={handleAdd2}>ADD2</button>
                <button onClick={handleAddOneGer}>ADDoneGer</button>
                <button onClick={handleDeleteEma}>DELETEema</button>
                <button onClick={handleDeleteGer}>DELETE2ger</button>
            </div>
        </div>
    )
}
import React from 'react'
import style from './SideCart.module.css'
import {useDispatch, useSelector} from 'react-redux'
import {useState, useEffect} from 'react'
import { deleteItem, pushItem } from '../../Actions/cart'
import { emphasize } from '@material-ui/core'

export function SideCart(){
    const [total, setTotal]= useState(0)
    const [count, setCount]= useState(0)
    const dispatch= useDispatch()
    const items= useSelector(state => state.cartReducer.items)
    const amount= useSelector(state => state.cartReducer.amount)
    
    function handleAdd(){
        dispatch(pushItem({
            name: 'Ema',
            id: 2,
            price: 100
        }))
    }

    function handleDelete(){
        dispatch(deleteItem(2))
    }


    useEffect(() => {
        let number= Object.keys(amount)
        setCount(number.length)
    }, [items])

    return (
        <div>
            <div className={style.items}>
                <h2>You have {count} items in your cart</h2>
                {items?.length>0 ? items.map(item => {
                    setTotal(total + item.price)
                    return(
                        
                        <div className={style.item}>
                            <div className={style.data}>
                                <h4>{item.name}</h4>

                                ${item.price}x{amount[item.id]}

                            </div>
                            <img src={item.print}/>
                        </div>
                    )
                    }) : <div>There's 0 items in your cart</div>
                } 
            </div>
            <div className={style.total}>
                TOTAL: {total}
            </div>
            <div>
                <button onClick={handleAdd}>ADD</button>
                <button onClick={handleDelete}>DELETE</button>
            </div>
        </div>
    )
}
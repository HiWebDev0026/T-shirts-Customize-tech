import React from 'react'
import style from './SideCart.module.css'
import {useDispatch, useSelector} from 'react-redux'
import {useState, useEffect} from 'react'
import { deleteItem, pushItem } from '../../Actions/cart'


export function SideCart(){
    const [total, setTotal]= useState(0)
    const [count, setCount]= useState(0)
    const dispatch= useDispatch()
    const items= useSelector(state => state.cartReducer.items)
    const amount= useSelector(state => state.cartReducer.amount) // {id: cantidad, id2: cantidad}
    const [flag, setFlag]= useState(false)
    
    console.log(items, amount)

    function handleAdd(){
        dispatch(pushItem({
            name: 'Ema',
            id: 2,
            price: 100,
            size: 'XL'
        }))
        setFlag(!flag)
    }

    function handleDelete(){
        dispatch(deleteItem(2))
        setFlag(!flag)
    }


    useEffect(() => {
        let number= Object.keys(amount)
        setCount(number.length)
    }, [flag])

    return (
        <div>
            <div className={style.items}>
                <h2>You have {count} items in your cart</h2>
                {items => items.map(item => {
                    setTotal(total + item.price)
                    return(
                        
                        <div className={style.item}>
                            <div className={style.data}>
                                <h4>{item.name}</h4>
                                <h4>{item.size}</h4>

                                ${item.price}x{amount[item.id]}

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
            <div>
                <button onClick={handleAdd}>ADD</button>
                <button onClick={handleDelete}>DELETE</button>
            </div>
        </div>
    )
}
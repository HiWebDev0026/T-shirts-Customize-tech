import React from 'react'
import style from './SideCart.module.css'
import {useDispatch, useSelector} from 'react-redux'
import {useState, useEffect} from 'react'

export function SideCart(){
    const [count, setCount]= useState(0)
    const items= useSelector(state => state.cartReducer.items)
    const amount= useSelector(state => state.cartReducer.amount)
    
    useEffect(() => {
        items.map(item => {
            items.map(second => {
                if (item.id === second.id){
                    
                }
            })

        })
    }, [items])

    return (
        <div>
            <div className={style.items}>
                <h2>You have {count} items in your cart</h2>
                {items?.length>0 ? items.map(item => {
                    return(
                        
                        <div className={style.item}>
                            <div className={style.data}>
                                <h4>{item.name}</h4>
                                <h4>{item.size}</h4>

                                ${item.price}x{item.quantity}

                            </div>
                            <img src={item.print}/>
                        </div>
                    )
                    }) : <div>There's 0 items in your cart</div>
                } 
            </div>
            <div className={style.total}>
                TOTAL
            </div>
        </div>
    )
}
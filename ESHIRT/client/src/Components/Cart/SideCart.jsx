import React from 'react'
import style from './SideCart.module.css'
import {useDispatch, useSelector} from 'react-redux'
import {useState, useEffect} from 'react'

export function SideCart(){

    const items= [
        {
            name: 'Dani',
            id: 1,
            print: 'https://http2.mlstatic.com/D_NQ_NP_634948-MLA32874228192_112019-W.jpg',
            size: 'M',
            color: 'yellow',
            model: 'v-neck',
            score: 4,
            public: false,
            created_by_user: true,
            price: 100
        },
        {
            name: 'Ema',
            id: 2,
            print: 'https://http2.mlstatic.com/D_NQ_NP_634948-MLA32874228192_112019-W.jpg',
            size: 'XL',
            color: 'white',
            model: 'round',
            score: 5,
            public: true,
            created_by_user: false,
            price: 100
        },
        {
            name: 'Ger',
            id: 3,
            print: 'https://http2.mlstatic.com/D_NQ_NP_634948-MLA32874228192_112019-W.jpg',
            size: 'L',
            color: 'green',
            model: 't-shirt',
            score: 3,
            public: false,
            created_by_user: false,
            price: 100
        }]
    
    const [count, setCount]= useState(0)
    
    useEffect(() => {
        let singleItems= items.map(item => {
            
        })
        setCount(items.length) 
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

                                ${item.price}x{/* Cantidad del item */}

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
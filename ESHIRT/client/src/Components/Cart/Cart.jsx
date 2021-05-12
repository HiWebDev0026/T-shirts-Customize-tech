import React from "react";
import ReactPaginate from "react-paginate";
import { BsFillHeartFill,BsFillTrashFill } from "react-icons/bs";

import Style from './Cart.module.css'

export default function Cart (){

    let items= [
        {
            name: 'Dani',
            print: 'https://http2.mlstatic.com/D_NQ_NP_634948-MLA32874228192_112019-W.jpg',
            size: 'S',
            color: 'yellow',
            model: 'v-neck',
            score: 4,
            public: false,
            created_by_user: true,
            id: 12323,
            price: 30,
            quantity:1
        },
        {
            name: 'Ema',
            print: 'https://http2.mlstatic.com/D_NQ_NP_634948-MLA32874228192_112019-W.jpg',
            size: 'XL',
            color: 'white',
            model: 'round',
            score: 5,
            public: true,
            created_by_user: false,
            id: 87879,
            price: 35,
            quantity:2
        },
        {
            name: 'Ger',
            print: 'https://http2.mlstatic.com/D_NQ_NP_634948-MLA32874228192_112019-W.jpg',
            size: 'L',
            color: 'green',
            model: 't-shirt',
            score: 3,
            public: false,
            created_by_user: false,
            id: 7978878,
            price: 40,
            quantity:3
        },
        {
            name: 'Eze',
            print: 'https://http2.mlstatic.com/D_NQ_NP_634948-MLA32874228192_112019-W.jpg',
            size: 'M',
            color: 'yellow',
            model: 'v-neck',
            score: 4,
            public: false,
            created_by_user: true,
            id: 12323,
            price: 30,
            quantity:1
        },
        {
            name: 'Javi',
            print: 'https://http2.mlstatic.com/D_NQ_NP_634948-MLA32874228192_112019-W.jpg',
            size: 'M',
            color: 'white',
            model: 'round',
            score: 5,
            public: true,
            created_by_user: false,
            id: 87879,
            price: 35,
            quantity:2
        },
        {
            name: 'Lean',
            print: 'https://http2.mlstatic.com/D_NQ_NP_634948-MLA32874228192_112019-W.jpg',
            size: 'M',
            color: 'green',
            model: 't-shirt',
            score: 3,
            public: false,
            created_by_user: false,
            id: 7978878,
            price: 40,
            quantity:3
        },
        {
            name: 'Agus',
            print: 'https://http2.mlstatic.com/D_NQ_NP_634948-MLA32874228192_112019-W.jpg',
            size: 'M',
            color: 'green',
            model: 't-shirt',
            score: 3,
            public: false,
            created_by_user: false,
            id: 7978878,
            price: 40,
            quantity:3
        }]
    
    let sizes=['S','M','L','XL']    

    // function handleDelete (e) {
    //     console.log('ENTRE')
    //     items = items.filter((i)=>{return i.id !== e.target.id});
    //     console.log('ID', e.target.id)
    //     console.log('FILTRADO', items)
    // }
    
    return(
        <div className={Style.general}>
            <div className={Style.container}>
                <div className={Style.left}>
                    <div className={Style.title}>
                        <h2>Let's do some shopping!</h2>
                    </div >
                    <div>
                        {
                            items.length>0?
                            items.map(it=>{
                                return <div className={Style.cartCard}> 
                                            <div className={Style.picture}>
                                                <img src={it.print} alt={'product'+ it.id} className={Style.image}/>
                                            </div>
                                            <div className={Style.column1}>
                                                <div className={Style.detail}>
                                                    <div className={Style.name}>{it.name}</div>
                                                    <div className={Style.sku}>SKU:{it.id}</div>
                                                </div>
                                                <div className={Style.btns}>
                                                    <button id={it.id}><BsFillTrashFill/></button>
                                                    <button><BsFillHeartFill/></button>
                                                </div>
                                            </div>
                                            <div className={Style.column2}>
                                                <div className={Style.price}>${it.price}</div>
                                            </div>
                                            <div className={Style.column3}>
                                                <div className={Style.size}>
                                                    <select name='size' id='size' required>
                                                        {
                                                            sizes.map((s)=>{
                                                                return it.size === s?
                                                                  <option value={s} selected>{s}</option>
                                                                : <option value={s}>{s}</option>
                                                            })  
                                                        }
                                                    </select>
                                                </div>
                                                <div className={Style.quantity}>
                                                    <input type="number"  min="1" max="10" value={it.quantity} className={Style.q}/>
                                                </div>
                                            </div>
                                        </div>
                            })
                        :<p>No selected items</p>
                        }
                    </div>
                </div>
                <div className={Style.rigth}>
                    <div className={Style.total}>
                        <h2>Total</h2>
                    </div>
                    <div>You have {items.length-1} items in your shopping cart </div>
                    <div>${items.reduce((a,c)=>a+c.price*c.quantity,0)}</div>
                    <button>Go bach shopping</button>
                    <button>Purchase</button>
                    
                </div>
            </div>
                <ReactPaginate
                previousLabel={'← Previous'}
                nextLabel={'Next →'}
           
                />
        </div>
    )
}
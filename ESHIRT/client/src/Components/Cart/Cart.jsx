import React from "react";
import { BsFillHeartFill,BsFillTrashFill } from "react-icons/bs";

import Style from './Cart.module.css'

export default function Cart (){

    const items= [
        {
            name: 'Dani',
            print: 'https://http2.mlstatic.com/D_NQ_NP_634948-MLA32874228192_112019-W.jpg',
            size: 'M',
            color: 'yellow',
            model: 'v-neck',
            score: 4,
            public: false,
            created_by_user: true,
            id: 12323
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
            id: 87879
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
            id: 7978878
        }]
    
    return(
        <div className={Style.general}>
            <div className={Style.title}>
            <h4>Let's do some shopping!</h4>
            </div>
            <div className={Style.left}>
                {
                    items.length>0?
                    items.map(it=>{
                        return <div className={Style.cartCard}> 
                                    <img src={it.print} alt={'product'+ it.id}/>
                                    <div className={Style.details}>
                                        <div className={Style.info}>  
                                            <div className={Style.name}>{it.name}</div>
                                            <div className={Style.sku}>SKU:{it.id}</div>
                                        </div>  
                                        <div className={Style.btns}>
                                            <button><BsFillTrashFill/></button>
                                            <button><BsFillHeartFill/></button>
                                        </div> 
                                    </div>  
                               </div>
                    })
                :<p>No selected items</p>
                }
            </div>
            <div className={Style.rigth}>

            </div>
        </div>
    )
}
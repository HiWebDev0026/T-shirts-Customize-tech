import style from "./Cards.module.css";
import React from "react";
import Card from '../Card/Card'
// {title, price, width, height, model, color}

function Cards(){
    let example= [
        {title: 'Ema', price: 100, width: 120, height: 165, model: 'V-NECK', color: 'Blue', image: 'https://http2.mlstatic.com/D_NQ_NP_634948-MLA32874228192_112019-W.jpg'},
        {title: 'Javi', price: 200, width: 100, height: 150, model: 'ROUNDED', color: 'White', image: 'https://http2.mlstatic.com/D_NQ_NP_634948-MLA32874228192_112019-W.jpg'}, 
        {title: 'Agus', price: 250, width: 110, height: 155, model: 'LONG-SLEEVED', color: 'Red', image: 'https://http2.mlstatic.com/D_NQ_NP_634948-MLA32874228192_112019-W.jpg'}, 
        {title: 'Eze', price: 150, width: 60, height: 140, model: 'T-SHIRT', color: 'Yellow', image: 'https://http2.mlstatic.com/D_NQ_NP_634948-MLA32874228192_112019-W.jpg'}, 
        {title: 'Lean', price: 300, width: 130, height: 175, model: 'ROUNDED', color: 'Pink', image: 'https://http2.mlstatic.com/D_NQ_NP_634948-MLA32874228192_112019-W.jpg'}, 
        {title: 'Ger', price: 90, width: 115, height: 160, model:'T-SHIRT', color: 'Green', image: 'https://http2.mlstatic.com/D_NQ_NP_634948-MLA32874228192_112019-W.jpg'}
    ]

    return (
        <div className={style.container}>
            {
            example.map(e => {
                return <Card
                    title= {e.title}
                    price= {e.price}
                    width= {e.width}
                    height= {e.height}
                    model= {e.model}
                    color= {e.color}
                    image= {e.image}
                />
            })
            }
        </div>
    )
}

export default Cards
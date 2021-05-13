import style from "./Card.module.css";
import React from "react";
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { FaCartPlus } from "react-icons/fa";
import {pushItem, deleteItem, addOne, outOne, changeSize} from '../../../Actions/cart.js'




function Card({ title, score, size, model, color, image, id }) {
const red = useSelector(state => state.cartReducer.items) 
const dispatch = useDispatch()
const [item, setItem] = useState({
  title, score, size, model, color, image, id, amount: 1
})

function handleAdd () {
  dispatch(pushItem(item))
}

function handleDelete () {
  dispatch(deleteItem(item.id))
}

function handleSizeChange (e) {
 setItem({...item, size: e.target.value})
dispatch(changeSize(item))
}

function handleAddOne () {
  
dispatch(addOne(item.id))
}
function handleOutOne () {
dispatch(outOne(item.id))
}


console.log(red)
  return (
    <div >
      <div className={style.wrapper}>
        <div className={style.container}>
          <div className={style.top}>
            <img className={style.image} src={image} />
          </div>
          <div className={style.bottom}>
            <div className={style.left}>
              <div className={style.details}>
                <a>{title}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a className={style.button} href={`#popup${id}`} >
        More info
      </a>
      <div className={style.popup} id={`popup${id}`} >
        <div className={style.popup_inner}>
        
          <div className={style.popup__photo}>
            <img src={image}/>
            
            <a className={style.popup__close} href="#">
              X
            </a>
          </div>
            <button onClick={handleAddOne}>+ 1</button>
            <button onClick={handleOutOne}>- 1</button>
            <select onChange={handleSizeChange} >
              <option>Change size</option>
              <option value="xl">XL</option>
              <option value="l">L</option>
              <option value="m">M</option>
              <option value="s">S</option>
              </select >
            <button onClick={handleAdd}>Add to Cart<FaCartPlus /></button>
            <button onClick={handleDelete}>Delete</button> 
          <div className={style.popup__text}>
              <h1>Details</h1>
              <p>{size}</p>
              <p>{title}</p>
            </div>
            
        </div>
       
      </div>
    </div>
  );
}

export default Card;

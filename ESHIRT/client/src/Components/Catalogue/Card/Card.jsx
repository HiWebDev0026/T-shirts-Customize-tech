import style from "./Card.module.css";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCartPlus } from "react-icons/fa";
import {MdDeleteForever} from "react-icons/md";
import {
  pushItem,
  deleteItem,
} from "../../../Actions/cart.js";

function Card({ title, score, price, size, model, color, image, id }) {
  
  const dispatch = useDispatch();
  const [item, setItem] = useState({
    title,
    score,
    price,
    size,
    model,
    color,
    image,
    id,
    amount: 1,
  });

  function handleAdd() {
    dispatch(pushItem(item));
  }

  function handleDelete() {
    dispatch(deleteItem(item.id));
  }

  function handleSizeChange(e) {
    setItem({...item, size: e.target.value})
  }

  function handleAddOne() {
    setItem({...item, amount: item.amount +1})
  }
  function handleOutOne() {
    if (item.amount > 1){
      setItem({...item, amount: item.amount -1})
    }
  }



  return (
    <div>
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
      <a className={style.button} href={`#popup${id}`}>
        More info
      </a>
      <div className={style.popup} id={`popup${id}`}>
        <div className={style.popup_inner}>
          <div className={style.popup__photo}>
            <img src={image} />

            <a className={style.popup__close} href="#">
              X
            </a>
          </div>
          <div className={style.popup__text}>
            <h1>Details</h1>
            <div>
              <h2>{title}</h2>
              <button className={style.buttonCart} onClick={handleAdd}>
                <FaCartPlus />
              </button>
              <button className={style.buttonCart} onClick={handleDelete}>
                <MdDeleteForever/>
              </button>
            </div>
            
            
            <p>Size: {item.size}</p>
            <p>Color: {color}</p>
            <p>Model: {model}</p>
            <p>Score: {score}</p>
            <p>Amount: {item.amount}</p>
            <div className={style.cartBox}>
              
                <div>
                        <button className={style.buttonCart} onClick={handleAddOne}>
                        + 1
                        </button>
                        <button className={style.buttonCart} onClick={handleOutOne}>
                        - 1
                        </button>
                        <select className={style.buttonCart} onChange={handleSizeChange}>
                          <option>Change size</option>
                          <option value="XL">XL</option>
                          <option value="L">L</option>
                          <option value="M">M</option>
                          <option value="S">S</option>
                        </select>
                      </div>
              
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;

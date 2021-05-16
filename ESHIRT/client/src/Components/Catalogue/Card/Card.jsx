import style from "./Card.module.css";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCartPlus } from "react-icons/fa";
import {MdDeleteForever} from "react-icons/md";
import {GrAdd, GrFormSubtract} from "react-icons/gr";
import { IconContext } from "react-icons";
import {
  pushItem,
  deleteItem,
} from "../../../Actions/cart.js";

function Card({ title, score, price, size, model, color, image, id }) {
  
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(1);
  const [newSize, setNewSize]= useState(size)

  function handleAdd() {
    dispatch(pushItem({ title, score, price, size: newSize, model, color, image, id, amount }));
  }

  function handleDelete() {
    dispatch(deleteItem(id));
  }

  function handleSizeChange(e) {
    setNewSize(newSize => newSize= e.target.value)
  }

  function handleAddOne() {
    setAmount(amount => amount + 1)
  }
  function handleOutOne() {
    if (amount > 1){
      setAmount(amount => amount - 1)
    }
  }


  return (
    <IconContext.Provider value={{ color: "coral", size:"3vh" }}>
    <a href={`#popup${id}`}>

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


            </div>
            
                <div>
                        <button className={style.buttonAM} onClick={handleAddOne}>
                        <GrAdd />
                        </button>
                        <button className={style.buttonAM} onClick={handleOutOne}>
                        <GrFormSubtract />
                        </button>

                        <select className={style.size} onChange={handleSizeChange}>
                          <option>Size</option>

                          <option value="XL">XL</option>
                          <option value="L">L</option>
                          <option value="M">M</option>
                          <option value="S">S</option>
                        </select>
                      </div>
            <p>Size: {newSize}</p>
            <p>Color: {color}</p>
            <p>Model: {model}</p>
            <p>Score: {score}</p>
            <p>Amount: {amount}</p>

            <div className={style.cartBox}>
              
              <button className={style.buttonCart} onClick={handleAdd}>
                <FaCartPlus />
              </button>
              <button className={style.buttonCart} onClick={handleDelete}>
                <MdDeleteForever/>
              </button>
              
              
            </div>
          </div>
        </div>
      </div>
    </a>
</IconContext.Provider>
  );
}

export default Card;

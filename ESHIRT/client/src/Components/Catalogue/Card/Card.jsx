import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCartPlus } from "react-icons/fa";
import {MdDeleteForever} from "react-icons/md";
import {GrAdd, GrFormSubtract} from "react-icons/gr";
import { IconContext } from "react-icons";
import { useAuth0} from "@auth0/auth0-react";
import Reviews from '../../Reviews/Reviews.jsx';
import { NavLink } from "react-router-dom";
import style from "./Card.module.css";
import {
  pushItem,
  deleteItem,
  postOrder,
  putOrder,
  checkLastOrder,
} from "../../../Actions/index.js";

function Card({ title, score, price, size, model, color, image, id }) {
  
  const cart = useSelector(state => state.cartReducer.items)
  const orderId = useSelector(state => state.ordersReducer.orderId)
  const isPosting = useSelector(state => state.ordersReducer.postStarted)
  const orderIdChecked = useSelector(state => state.ordersReducer.lastOrderChecked)
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(1);
  const [newSize, setNewSize]= useState(size)
  const {isAuthenticated, getAccessTokenSilently, user } = useAuth0();

  
  useEffect(() => {
    if (isAuthenticated && !orderIdChecked && !isPosting) {
      dispatch(checkLastOrder(user.sub.split('|')[1]))
    }

    if (isAuthenticated && orderId === 0 && !isPosting) {
      dispatch(postOrder(cart, user.sub.split('|')[1]))
    } else if (isAuthenticated && orderId) {
      dispatch(putOrder(cart, orderId))
    }
  
  }, [cart, isPosting])


  
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

  
  <div>
 
      <div className={style.wrapper}>
      <a href={`#popup${id}`}>
        <div className={style.container}>
          <div className={style.top}>
            <img className={style.image} src={image} />
          </div>
          <div className={style.bottom}>
            <div className={style.left}>
              <div className={style.details}>
                <a >{title}</a>
              </div>
            </div>
           
          </div>
        </div>
        </a>
      </div>
      
      <div className={style.popup} id={`popup${id}`}>
        <div className={style.popup_inner}>
          <div className={style.popup__photo}>
            <img src={image} />
            
            <a className={style.popup__close} href="#">
              X
            </a>
           
          </div>

          <NavLink to={`/shirt/${id}/review`}>

                <button className="boton">Reviews</button>
              </NavLink>
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
                        <label>
                        <select className={style.size} onChange={handleSizeChange}>
                          <option selected="true" disabled="disabled">size</option>
                          <option value="XL">XL</option>
                          <option value="L">L</option>
                          <option value="M">M</option>
                          <option value="S">S</option>
                        </select>
                        </label>
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
      </div>
     

  );
}

export default Card;

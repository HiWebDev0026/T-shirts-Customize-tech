import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCartPlus } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { GrAdd, GrFormSubtract } from "react-icons/gr";
import { IconContext } from "react-icons";
import { useAuth0 } from "@auth0/auth0-react";
import swal from "sweetalert";
import {HiShoppingCart} from "react-icons/hi";
import { BsFillHeartFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import style from "./Card.module.css";
import {
  setCartItems,
  checkLastOrder,
  postOrder,
  putOrder,
  postFavorite,
  getShirtScore,
  getShirtReview,
} from "../../../Actions/index.js";

function Card({ title, score, price, size, model, color, image, id, latestPrice, stock }) {
  const cart = useSelector((state) => state.cartReducer.items);
  const orderId = useSelector((state) => state.ordersReducer.orderId);
  const scoreReview = useSelector((state) => state.reviewsReducer.score);
  const review = useSelector((state) => state.reviewsReducer.reviews);
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(1);
  const [newSize, setNewSize] = useState(size);
  const { isAuthenticated, user, loginWithPopup } = useAuth0();

  const handleCartChange = (e, operation) => {
    e.preventDefault();
    const item = {
      title,
      score,
      price,
      size: newSize,
      model,
      color,
      image,
      id,
      amount: (operation === "-" && 500) || amount,
    };
    dispatch(setCartItems(item, operation));
    
    operation === '+' && swal({ title: "added to Cart!", icon: "success", timer: 3000 })

    if (isAuthenticated && !orderId) {
      dispatch(postOrder([...cart, item], user.sub.split("|")[1]));
    } else if (isAuthenticated && orderId) {
      dispatch(
        putOrder(
          [...cart, item],
          orderId,
          (operation === "+" && "add") || "remove"
        )
      );
    }
  };

  // useEffect(() => {
  //   if (isAuthenticated && !orderIdChecked) {
  //     dispatch(checkLastOrder(user.sub.split('|')[1]))
  //   }
  //   if (isAuthenticated && orderId === 0) {
  //     dispatch(postOrder(cart, user.sub.split('|')[1]))
  //   } else if (isAuthenticated && orderId) {
  //     dispatch(putOrder(cart, orderId))
  //   }

  // }, [localStorage])

  function handleSizeChange(e) {
    setNewSize((newSize) => (newSize = e.target.value));
  }

  function handleAddOne() {
    setAmount((amount) => amount + 1);
  }
  function handleOutOne() {
    if (amount > 1) {
      setAmount((amount) => amount - 1);
    }
  }

  function handleScore() {
    dispatch(getShirtReview(id));
    dispatch(getShirtScore(id));
  }
  function handleFavorite(e) {
    e.preventDefault();
    if (isAuthenticated) {
      const userId = user.sub.split("|")[1];
      dispatch(postFavorite(userId, { shirtId: id }));
      swal({ title: "added to favorites", icon: "success", timer: 3000 });
    } else {
      loginWithPopup();
    }
  }

  function setStars(scoreReview) {
    const stars = [];
    for (let i = 0; i < scoreReview; i++) {
      stars.push(i);
    }
    return (
      <div>
        
        {stars.map((n) => {
          return <i key={n}>★</i>;
        })}
        
      </div>
    );
  }
  return (
    <div>
      <div className={style.wrapper}>
        <a onClick={handleScore} href={`#popup${id}`}>
          <div className={style.container}>
       
            <div className={style.top}>
            <div className={style.off}>{latestPrice}</div>
            {stock !== 0 ? stock <= 10 ? <div className={style.stock}>Latest units...</div> : <div></div> : <div className={style.stock}>NO STOCK</div>}   
              <img className={style.image} src={image} />
            </div>       
            <div className={style.details}>
           
              <a>{title}</a>
            {
              stock > 0 ?
              <i  className={style.btns} onClick={(e) => handleCartChange(e, "+")}><HiShoppingCart /></i>
                :
              <div></div>
            }
            </div>
            <a className={style.price}>${price}</a>
            
          </div>
        </a>
      </div>

      <div className={style.popup} id={`popup${id}`}>
        <div className={style.popup_inner}>
          <div>
            
          <div className={style.offPopup}>{latestPrice}</div>
            {stock !== 0 ? stock <= 10 ? <div className={style.stockPopup}>Latest units...</div> : <div></div> : <div className={style.stockPopup}>NO STOCK</div>}   
              <img className={style.imagePopup} src={image} />
            <div className={style.ratings}>
              {isNaN(scoreReview) ? (
                <div className={style.textReview}>
                <p>no reviews, be the first...</p>
                 <p>${price}</p>
                 </div>
              ) : (
                <div className={style.textReview}>
                  <span class={style.product_rating}>{scoreReview}</span>
                  <span >/5</span> <span>${price}</span>
                </div>
              )}
              <div className={style.stars}>{setStars(scoreReview)}</div>
            </div>
           

            <a className={style.popup__close} href="#">
              X
            </a>
          </div>
          <NavLink to={`/shirt/${id}/review`}>
            <a className={style.textMoreReview}>More reviews...</a>
          </NavLink>
          {review ? (
            <div className={style.background_review}>
              <h3 className={style.textReview}>{review[review.length - 1]?.name}</h3>
              <p className={style.textReviewCont}>{review[review.length - 1]?.content}</p>
            </div>
          ) : (
            <p className={style.textReview}>no reviews yet</p>
          )}
          <div className={style.popup__text}>
            <div>
              <h3 className={style.shadowsTitle}>{title}</h3>
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
                  <option selected="true" disabled="disabled">
                    size
                  </option>
                  <option value="XL">XL</option>
                  <option value="L">L</option>
                  <option value="M">M</option>
                  <option value="S">S</option>
                </select>
              </label>
            </div>
           <ul className={style.textReview2}>
            <li>Size: {newSize}</li>
            <li>Color: {color}</li>
            <li>Model: {model}</li>
            <li>Amount: {amount}</li>
            
            </ul>
            <div className={style.cartBox}>
              
              { 
              stock >= 1 ?
                <div>
                <button
                  className={style.buttonCart}
                  onClick={(e) => handleCartChange(e, "+")}
                >
                  <FaCartPlus />
                </button>
                <button
                  className={style.buttonCart}
                  onClick={(e) => handleCartChange(e, "-")}
                >
                  <MdDeleteForever />
                </button>
                <button
                id={id}
                onClick={handleFavorite}
                className={isAuthenticated ? style.buttonAM : style.greyHeart}
              >
                <BsFillHeartFill />
              </button>
                </div>
                  : 
                <div></div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;


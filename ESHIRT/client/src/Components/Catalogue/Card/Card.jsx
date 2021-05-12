import style from "./Card.module.css";
import React from "react";


import { FaCartPlus } from "react-icons/fa";

function Card({ title, score, size, model, color, image, id }) {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.top}>
          <img className={style.image} src={image} />
        </div>
        <div className={style.bottom}>
          <div className={style.left}>
            <div className={style.details}>
              <a href="#popup1">{title}</a>
            </div>
            <div id="popup1" className={style.overlay}>
              <div className={style.popup}>
                <a className={style.close} href="#">
                  &times;
                </a>
                <div className={style.content}>
                  <p>{model}</p>
                  <p>{color}</p>
                </div>
              </div>
            </div>
            <div className={style.buy}>
              <buton>
                <FaCartPlus />{" "}
              </buton>
            </div>
          </div>
        </div>
      </div>
      {/* <div className={style.inside}>
        <div className={style.icon}>
      
        </div>
        <div className={style.contents}>
          <table>
            <tr>
              <th>Size</th>
              <th>Score</th>
            </tr>
            <tr>
              <td>{size}</td>
              <td>{score}</td>
            </tr>
            <tr>
              <th>Model</th>
              <th>Color</th>
            </tr>
            <tr>
              <td>{model}</td>
              <td>{color}</td>
            </tr>
          </table>
        </div>
      </div> */}
    </div>
  );
}

export default Card;

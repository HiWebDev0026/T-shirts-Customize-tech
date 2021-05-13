import style from "./Card.module.css";
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import DehazeIcon from '@material-ui/icons/Dehaze';

import { FaCartPlus } from "react-icons/fa";

function Card({title, score, size, model, color, image, id}){
  




  return (
   <div>
    <div className={style.wrapper}>
       
      <div className={style.container}>
        <div className={style.top}>
          <img className={style.image} src= {image}/>
        </div>
        <div className={style.bottom}>
          <div className={style.left}>
            <div className={style.details}> 
            <a >{title}</a>                     
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
        <a className={style.button} href="#popup">More info</a>
        <div className={style.popup} id="popup">
          <div className={style.popup_inner}>
            <div className={style.popup__photo}>
              
          
            <div className={style.popup__text}>
              <h1>Details</h1>
              <p>{size}</p>
              <p>{title}</p>
            </div>
            <a className={style.popup__close} href="#">X</a>
          </div>
        </div>
      </div>
      </div>
  );
}

export default Card;

import style from "./Card.module.css";
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import DehazeIcon from '@material-ui/icons/Dehaze';
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";


function Card({title, price, width, height, model, color, image}){
  console.log(title)
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.top}>
          <img className={style.image} src= {image}/>
        </div>
        <div className={style.bottom}>
          <div className={style.left}>
            <div className={style.details}>
              <h1>{title}</h1>
              <p>£{price}</p>
            </div>
            <div className={style.buy}>
              <IconButton aria-label="add" >
                <AddShoppingCartIcon color="secondary" value="cart"fontSize="large"className="cart" />
                 
               
              </IconButton>
            </div>
          </div>
        </div>
      </div>
      <div className={style.inside}>
        <div className={style.icon}>
        <IconButton aria-label="add" >
                <DehazeIcon  fontSize="large"className="dtl" />              
              </IconButton>
        </div>
        <div className={style.contents}>
          <table>
            <tr>
              <th>Height</th>
              <th>Width</th>
            </tr>
            <tr>
              <td>{height}cm</td>
              <td>{width}cm</td>
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
      </div>
    </div>
  );
}

export default Card;

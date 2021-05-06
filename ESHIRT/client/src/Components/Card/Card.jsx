import "./App.css";
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import DehazeIcon from '@material-ui/icons/Dehaze';
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";




function App() {
  return (
    <div className="wrapper">
      <div className="container">
        <div className="top"></div>
        <div className="bottom">
          <div className="left">
            <div className="details">
              <h1>Chair</h1>
              <p>£250</p>
            </div>
            <div className="buy">
              <IconButton aria-label="add" >
                <AddShoppingCartIcon color="secondary" value="cart"fontSize="large"className="cart" />
                 
               
              </IconButton>
            </div>
          </div>
        </div>
      </div>
      <div className="inside">
        <div className="icon">
        <IconButton aria-label="add" >
                <DehazeIcon  fontSize="large"className="dtl" />              
              </IconButton>
        </div>
        <div className="contents">
          <table>
            <tr>
              <th>Width</th>
              <th>Height</th>
            </tr>
            <tr>
              <td>3000mm</td>
              <td>4000mm</td>
            </tr>
            <tr>
              <th>Something</th>
              <th>Something</th>
            </tr>
            <tr>
              <td>200mm</td>
              <td>200mm</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;

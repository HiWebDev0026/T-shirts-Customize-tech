import React from "react";
import Style from './HomeUser.module.css';
import {NavLink} from 'react-router-dom';

function HomeUser(){

  return (

    <div className={Style.container}>   
      <NavLink to= '/favorites'className={Style.title}>
        <h2 >FAVORITES</h2>
      </NavLink>
      <NavLink to= '/cart'className={Style.title}>
        <h2 >CART</h2>
      </NavLink>
      <NavLink to= '/userOrders'className={Style.title}>
        <h2 >ORDERS</h2>
      </NavLink>
      <NavLink to= '/userData'className={Style.title}>
        <h2 >PERSONAL INFO</h2>
      </NavLink>
  </div>
  )
};

export default HomeUser;
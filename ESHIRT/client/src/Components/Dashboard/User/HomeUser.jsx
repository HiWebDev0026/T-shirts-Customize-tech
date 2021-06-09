import React from "react";
import Style from './HomeUser.module.css';
import {NavLink} from 'react-router-dom';
import UserOrders from './UserOders'

function HomeUser(){

  return (

    <div className={Style.container}>   
      <UserOrders/>
  </div>
  )
};

export default HomeUser;
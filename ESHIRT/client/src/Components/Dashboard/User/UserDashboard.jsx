import React, { useState } from "react";
import Style from './UserDashboard.module.css';
import Clock from '../Clock';
import HomeUser from './HomeUser';
import { useSelector} from "react-redux";


function UserDashboard(){

  const userDB = useSelector((state) => state.userReducer.userId);

  return (

    <div className={Style.container}>   
      <div className={Style.box}>
        <div className={Style.left}>
          <h1>Welcome {userDB.name}</h1>
          {/* <div>
            {display}
          </div> */}
        </div>
        <div className={Style.sideBar}>
        <Clock />
        <HomeUser  />
        </div>
    </div>
  </div>
  )
};

export default UserDashboard;
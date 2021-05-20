import React from "react";
import Style from './UserDashboard.module.css';
import Clock from './Dashboard'
import Calendar from './Calendar';
import HomeUser from '../User/HomeUser';


function UserDashboard(){

  return (

    <div className={Style.container}>   
      <h1>Welcome!</h1>
      <Clock />
      <div className={Style.box}>
        <div className={Style.sideBar}>
          <HomeUser />
        </div>
        <div className={Style.adminData}>
          <h3>lalalal</h3>
        </div>
        <div className={Style.calendar}>
          <Calendar />
        </div>
    </div>
  </div>
  )
};

export default UserDashboard;
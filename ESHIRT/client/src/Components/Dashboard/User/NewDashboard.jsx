import React, { useState, useEffect} from "react";
import Style from './UserDashboard.module.css';
import Clock from '../Clock';
import HomeUser from './HomeUser';
import {useDispatch, useSelector} from "react-redux";
import {getUserById} from '../../../Actions/index.js';
import { useAuth0} from "@auth0/auth0-react";
import Favorites from '../../Favorites/Favorites';
import Cart from '../../Cart/Cart';
import Orders from './UserOders';
import UserData from './UserData';
import UserOrders from "./UserOders";


function UserDashboard(){

    //const dispatch = useDispatch();
    //const userDB = useSelector((state) => state.userReducer.userId);
    // const {user} = useAuth0();
    // const {sub} = user;
    // let id = sub.split("|")[1];
    // useEffect(() => {
    // dispatch(getUserById(id));
    // }, []);
    const userDB = {name:"Max Power"};
    const [display, setDisplay] = useState();
    function handleClick(e){
        switch(e.target.value){
            case 'favorites': setDisplay(<Favorites/>);
            break;
            case 'cart': setDisplay(<Cart/>);
            break;
            case 'orders': setDisplay(<UserOrders/>);
            break;
            case 'personalInfo': setDisplay(<UserData/>);
            break;
            default: break;
        }
    }

  return (

    <div className={Style.container}>   
      <div className={Style.box}>
        <div className={Style.left}>
          <h1>Welcome {userDB.name}</h1>
          <div>
            {display}
          </div>
        </div>
        <div className={Style.sideBar}>
        <Clock />
        <div className={Style.options}>
            <button onClick={(e)=>handleClick(e)} value="favorites" className={Style.optionsItems}>FAVORITES</button>
            <button onClick={(e)=>handleClick(e)} value="cart" className={Style.optionsItems}>CART</button>
            <button onClick={(e)=>handleClick(e)} value="orders" className={Style.optionsItems}>ORDERS</button>
            <button onClick={(e)=>handleClick(e)} value="personalInfo" className={Style.optionsItems}>PERSONAL INFO</button>
        </div>
        {/* <HomeUser  /> */}
        </div>
    </div>
  </div>
  )
};

export default UserDashboard;
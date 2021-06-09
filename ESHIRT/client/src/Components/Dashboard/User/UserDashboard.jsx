import React, { useEffect} from "react";
import Style from './UserDashboard.module.css';
import Clock from '../Clock';
import HomeUser from './HomeUser';
import {useDispatch, useSelector} from "react-redux";
import {getUserById, getUsers} from '../../../Actions/index.js';
import { useAuth0} from "@auth0/auth0-react";


function UserDashboard(){

  const dispatch = useDispatch();
  const userDB = useSelector((state) => state.userReducer.userId);
  const {user} = useAuth0();
  const {sub} = user;
  let id = sub.split("|")[1];
  useEffect(() => {
    dispatch(getUserById(id));
    dispatch(getUsers());
  }, []);

  return (

    // <div className={Style.container}>   
      <div className={Style.box}>
        <div className={Style.sideBar}>
          <HomeUser  />
        </div>
        <div className={Style.left}>
          <h1>Welcome {userDB.name}</h1>
          {/* <div>
            {display}
          </div> */}
        </div>
      </div>
    // </div>
  )
};

export default UserDashboard;
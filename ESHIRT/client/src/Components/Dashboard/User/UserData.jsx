import React, {useEffect} from 'react';
import Style from './UserData.module.css';
import { useAuth0} from "@auth0/auth0-react";
import {NavLink} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import {getUserById} from '../../../Actions/index.js';



function UserData(){
    
    const userDB = useSelector((state) => state.userReducer.userId);
    const dispatch = useDispatch();
    const {user} = useAuth0();
    const { name, sub, email } = user;
    let id = sub.split("|")[1];
    

    useEffect(() => {
        dispatch(getUserById(id));
        console.log("user",userDB)
    }, []);



    return(
        <div className={Style.container}>   
            <h3 className={Style.title}>Personal Info</h3>
            <ul className={Style.ul}>
                <li>FullName: {userDB.name}  </li>
                <li>E-mail : {userDB.email}</li>
                <li>Id : {id}</li>
            </ul>
            <NavLink to='/userEdit'>
                <h4 className={Style.btn}>EDIT INFO</h4>
            </NavLink>
            <NavLink to='/userDash'>
                <h4 className={Style.btn}>CONTROL PANEL</h4>
            </NavLink>
        </div>
    )
}

export default UserData;
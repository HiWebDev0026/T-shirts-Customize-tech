import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, getUserById, getUsers } from "../../../Actions/index.js";
import Style from "./UserDetail.module.css";

export default function UserDetail (){


const user = useSelector((state) => state.userReducer.userId);
const dispatch = useDispatch();

useEffect(() => {
    dispatch(getUserById(user.id));
  }, []);

console.log(user)
    return (
        <div className={Style.Title}>
            <h2>User detail</h2>

              <p className={Style.Titles}>{user.name}</p>
              <p className={Style.Titles}>{user.lastname}</p>
              <p className={Style.Titles}>{user.email}</p>
              <p className={Style.Titles}>{user.country}</p>
              <p className={Style.Titles}>{user.city}</p>
              <p className={Style.Titles}>{user.adress}</p>
              <p className={Style.Titles}>{user.phone}</p>


        </div>
    )
}
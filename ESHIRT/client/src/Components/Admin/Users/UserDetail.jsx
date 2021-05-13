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
            <div className={Style.Tarjet}>
            <div className={Style.Titles1}>
            <h2 className={Style.Detail}>User detail</h2>
              <p>{user.name}</p>
              <p>{user.lastname}</p>
              <p>{user.email}</p>
              <p>{user.country}</p>
              <p>{user.city}</p>
              <p>{user.adress}</p>
              <p>{user.phone}</p>

              </div>
              </div>

        </div>
    )
}
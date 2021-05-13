import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, getUsers } from "../../../Actions/index.js";
import Style from "./UserDetail.module.css";

export default function UserDetail (){


const user = useSelector((state) => state.userReducer.userId);

console.log(user)
    return (
        <div className={Style.HOLi}>

              <p className={Style.Titles}>{user.name}</p>
              <p className={Style.Titles}>{user.email}</p>
        </div>
    )
}
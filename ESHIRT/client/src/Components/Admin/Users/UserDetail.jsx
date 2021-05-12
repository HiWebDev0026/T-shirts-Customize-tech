import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, getUsers } from "../../../Actions/index.js";
import Style from "./UserDetail.module.css";

export default function (){

    return (
        <div className={Style.HOLi}>

            DETAIL USER AND EDIT
        </div>
    )
}
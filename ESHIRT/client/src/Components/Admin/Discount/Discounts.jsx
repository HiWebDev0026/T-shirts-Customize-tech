import React, { useEffect, useState } from "react";
import {useSelector, useDispatch} from 'react-redux';
import {NavLink} from 'react-router-dom';
import Style from "./Discount.module.css";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import {useTokenDecode} from '../../../hooks/tokenDecoding';
/* import {useAdminCheck} from '../../../hooks/adminCheck' */
import ErrorNoAdminPage from '../ErrorPages/ErrorNoAdmin';
import { getCategories } from "../../../Actions";

export default function Discounts() {

    const {isAuthenticated} = useAuth0();
    const isAdmin = useTokenDecode(localStorage.currentToken);
    const categories= useSelector((state)=>state.categoryReducer.allCategories);
    const dispatch= useDispatch();

    let category= ['Categories']
    categories.map((temp) => {
        return category.push(temp.name)
      })


    useEffect(()=>{
        dispatch(getCategories());
      },[])

      
    function handleChange1(e) {
        const value = e.target.value;
        const name = e.target.name
        console.log(value)
    }
    

    return(
        isAdmin === null ? 'LOADING' : isAdmin === false ? (<ErrorNoAdminPage />) : 
        <div>
           
            <div className={Style.Title}>
                <h1>DISCOUNTS</h1>
          

        <select onChange={handleChange1}>
          {category.map((temp) => {
            return <option value={temp}>{temp} </option>; //Template
          })}
        </select>
        <p>Percentage</p>
        <input type= 'number' min='0' max='75' placeholder='Choose the %' />
        <button>APLY</button>





           
            </div>
            <NavLink to='home_admin'>
        <h4 className={Style.Btn3}>CONTROL PANEL</h4>
    </NavLink>  
        </div>
    )
}
import React, { useEffect, useState } from "react";
import {useSelector, useDispatch} from 'react-redux';
import {NavLink} from 'react-router-dom';
import Style from "./Discount.module.css";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import {useTokenDecode} from '../../../hooks/tokenDecoding';
/* import {useAdminCheck} from '../../../hooks/adminCheck' */
import ErrorNoAdminPage from '../ErrorPages/ErrorNoAdmin';
import { getCategories } from "../../../Actions";
import axios from 'axios';
import swal from 'sweetalert';

export default function Discounts() {

    const {isAuthenticated} = useAuth0();
    const isAdmin = useTokenDecode(localStorage.currentToken);
    const categories= useSelector((state)=>state.categoryReducer.allCategories);
    const dispatch= useDispatch();
    const [discount, setDiscount] = useState({day: '', category: '', percentage:'' });

    let category= ['Category']
    categories.map((temp) => {
        return category.push(temp.name)
      })


    useEffect(()=>{
        dispatch(getCategories());
      },[])

      
    function handleChange1(e) {
        const value = e.target.value;
        const name = e.target.name
        setDiscount({
            ...discount, [name]:value
        })
    }
    function handleSubmit(e){
        e.preventDefault()
        axios({
            method: 'post',
            url: '/shirt/_admin_discount',
            data: {discount: `${discount.day}-${discount.category}/${discount.percentage}`}
        })
        swal({ 
            title: "DISCOUNT",
            text: "Category " + e.target.value + " have discount now",
            icon: "success",
            timer: 2500,
            padding: "0.75rem"
            });

    }
    
    let days= ['Day','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    return(
        isAdmin === null ? 'LOADING' : isAdmin === false ? (<ErrorNoAdminPage />) : 
        <div>
           
            <div className={Style.Title}>
                <h1>DISCOUNTS</h1>
          
            <select name='day' onChange={handleChange1}>
          {days.map((temp) => {
            return <option value={temp}>{temp} </option>; //Template
          })}
        </select>

        <select name= 'category' onChange={handleChange1}>
          {category.map((temp) => {
            return <option value={temp}>{temp} </option>; //Template
          })}
        </select>
        <p>Percentage</p>
        <input name='percentage' type= 'number' min='0' max='75' placeholder='Choose the %' onChange={handleChange1}/>
        <button onClick={handleSubmit}>APLY</button>





           
            </div>
            <NavLink to='home_admin'>
        <h4 className={Style.Btn3}>CONTROL PANEL</h4>
    </NavLink>  
        </div>
    )
}
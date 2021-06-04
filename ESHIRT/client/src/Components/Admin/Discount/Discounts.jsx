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
    const [count, setCount]= useState(0);

    let category= ['Category', 'ALL']
    categories.map((temp) => {
        return category.push(temp.name)
      })

      function handleDiscount (){
       let names= [];
          setDiscount(count +1)
      for(let i = 0; i < categories.length; i ++){
        if(categories[i].shirts[0]?.latestPrice > categories[i].shirts[0]?.price){
            names.push(' ' + categories[i].name)
            
             swal({ 
                title: names, 
                text: "have discount",
                icon: "success",
                timer: 3000,
                padding: "0.75rem"
                });
        }
        if(names.length === 0){
            swal({ 
                title: "Discounts ", 
                text: "NOT FOUND",
                icon: "warning",
                timer: 2000,
                padding: "0.75rem"
                });
        }
        }
    }

    

    useEffect(()=>{
        dispatch(getCategories());
      },[count])

      
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
            method: 'put',
            url: '/shirt/_admin/_discount',
            data: {discount: `${discount.day}-${discount.category}/${discount.percentage}`}
        }).then(()=>
        swal({ 
            title: "DISCOUNT",
            text: "Category " + discount.category + " has been applied a discount of " + discount.percentage,
            icon: "success",
            timer: 3500,
            padding: "0.75rem"
            })
        ).catch(()=> swal({
            title: "Unable to set DISCOUNT",
            text: `${discount.day}-${discount.category}/${discount.percentage}`,
            icon: "error",
        }))
    }
    function handleReset(e){
        e.preventDefault()

        swal({
            title: "All discounts will be reset to 0%. Are you sure?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willReset) => {
            if(willReset){
        axios({
                method: 'put',
                url: '/shirt/_admin/_discount',
                data: {discount: "RESET-ALL/0"}
             }).then(()=>swal({ 
                title: "Reset",
                text: "Category " + discount.category + "  has been reset",
                icon: "info",
                timer: 2500,
                padding: "0.75rem"
                }))
    
            } else {
                swal("Discount not changed")
            }
        }
        
        )   
    }
    
    

    let days= ['Day','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    return(
        isAdmin === null ? 'LOADING' : isAdmin === false ? (<ErrorNoAdminPage />) : 
        <div>
           
            <div className={Style.Title}>
                <h1 className={Style.Title1}>DISCOUNTS</h1>
          
            <select className={Style.Order} name='day' onChange={handleChange1}>
          {days.map((temp) => {
            return <option value={temp}>{temp} </option>; //Template
          })}
        </select>

        <select name= 'category' onChange={handleChange1}>
          {category.map((temp) => {
            return <option value={temp}>{temp} </option>; //Template
          })}
        </select>
        <p className={Style.Title2}>PERCENTAGE</p>
        <input className={Style.Percentage} name='percentage' type= 'number' min='0' max='75' placeholder='%' onChange={handleChange1}/>
        <button className={Style.Btn}  onClick={handleSubmit}>APLY</button>
        <button className={Style.Btn2} onClick={handleReset}>RESET</button>
        <button className={Style.Btn1} onClick={handleDiscount}>CONSULT</button>
{/* 
        {
            <div>
            {'hola' && handleDiscount}
            </div>
} */}



           
            </div>
            <NavLink to='home_admin'>
        <h4 className={Style.Btn3}>CONTROL PANEL</h4>
    </NavLink>  
        </div>
    )
}
import React, {useEffect, useState} from 'react';
import Style from './UserOrder.module.css';
// import { useAuth0} from "@auth0/auth0-react";
import {NavLink} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import {getOrders, getOrdersByUserId} from '../../../Actions/index.js';



function UserOrders(){
    
    const dispatch = useDispatch();
    // const orders = useSelector((state) => state.ordersReducer.orderId);
    // const {user} = useAuth0();
    // const {sub} = user;
    // let id = sub.split("|")[1];
    

    useEffect(() => {
        // dispatch(getOrdersByUserId("105677628845670307410"));
    }, []);

    let orders = [
        {id:1, status:"PENDING"},
        {id:2, status:"APROVEDED"},
        {id:3, status:"DISPATCHED"},
        {id:4, status:"DONE"},
        {id:5, status:"CANCELED"},
    ]


    const [filtered, setFiltered] = useState([]);
    const [statusToFilter, setStatus] = useState('')
    let status= ['SELECT STATUS', 'PENDING', 'APPROVED', 'DISPATCHED', 'DONE', 'CANCELED']
    
    function handleChange(e){
        console.log(e.target.value);
        setStatus(e.target.value);
    }
    function filter(e){
        e.preventDefault();
        console.log(statusToFilter)
        setFiltered( orders.filter((item)=> item.status === statusToFilter ))
        console.log(filtered);
    }

    let ordersToMap = filtered.length > 0 ? filtered : orders;
    console.log("map", ordersToMap);

    return(
        <div className={Style.container}>   
            <h1 className={Style.title}>Your orders</h1>
            <div className={Style.filter}>
                <select onChange={handleChange} className={Style.select}>
                    {status.map((each, index)=>{ return <option className={Style.option} key={index} value ={each} >{each}</option>})}
                </select>
                <button className={Style.filterBtn}  onClick={(e)=>filter(e)}>Status</button>
            </div>

            <div className={Style.box}>
            {
                // userDB.length>0?
                // userDB.forEach(order => {
                ordersToMap.length> 0 ?
                ordersToMap.map(order => {
                    return <ul className={Style.ul}>
                                <li className={Style.li}>Order id: {order.id}</li>
                                <li className={Style.li}>Status: {order.status}</li>
                            </ul>
                })
                :<h1>You have no orders</h1>
            }
            </div>
            <NavLink to='/userDash'>
                <h4 className={Style.btn}>CONTROL PANEL</h4>
            </NavLink>
        </div>
    )
}

export default UserOrders;
import React, {useEffect, useState} from 'react';
import Style from './UserOrder.module.css';
// import { useAuth0} from "@auth0/auth0-react";
import {NavLink} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import {getOrders, getOrdersByUserId} from '../../../Actions/index.js';



function UserOrders(){
    
    const dispatch = useDispatch();
    const allOrders = useSelector((state) => state.ordersReducer.orders);
    const {user} = useAuth0();
    const {sub} = user;
    let id = sub.split("|")[1];
    

    useEffect(() => {
        dispatch(getOrders());
    }, []);
    
    // let orders = [
    //     {id:1, status:"PENDING"},
    //     {id:2, status:"APROVEDED"},
    //     {id:3, status:"DISPATCHED"},
    //     {id:4, status:"DONE"},
    //     {id:5, status:"CANCELED"},
    // ]
    //let id = '105677628845670307411';
    let orders = allOrders.filter(order=>order.userId === id);
    console.log("allorders", allOrders)
    console.log("ordersUser", orders);

    const [filtered, setFiltered] = useState([]);
    const [statusToFilter, setStatus] = useState('')
    let status= ['SELECT STATUS', 'PENDING', 'APPROVED', 'DISPATCHED', 'DONE', 'CANCELED']
    
    function handleChange(e){
        setStatus(e.target.value);
    }
    function filter(e){
        e.preventDefault();
        setFiltered( orders.filter((item)=> item.status === statusToFilter ))

    }

    let ordersToMap = filtered.length > 0 ? filtered : orders;

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
                ordersToMap.length> 0 ?
                ordersToMap.map(order => {
                    return <ul className={Style.ul}>
                                <NavLink to={`/userOrderDetail/${order.id}`}><li className={Style.li}>Order id: {order.id}</li></NavLink>
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
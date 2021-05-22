import React, {useEffect} from 'react';
import Style from './UserOrder.module.css';
import { useAuth0} from "@auth0/auth0-react";
import {NavLink} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import {getOrders, getOrdersByUserId} from '../../../Actions/index.js';



function UserOrders(){
    
    const userDB = useSelector((state) => state.ordersReducer.orderId);
    const prueba = useSelector((state) => state.ordersReducer.orders);
    const dispatch = useDispatch();
    const {user} = useAuth0();
    const {sub} = user;
    let id = sub.split("|")[1];
    

    useEffect(() => {
        dispatch(getOrders());
        dispatch(getOrdersByUserId(id));
        console.log("user",userDB)
        console.log("orders", prueba)
    }, []);



    return(
        <div className={Style.container}>   
            <h1 className={Style.title}>Your orders</h1>
            {/* <div className={Style.box}>
            {
                userDB.length>0?
                userDB.forEach(order => {
                    return <ul className={Style.ul}>
                                <li className={Style.li}>{order.shirtId}</li>
                                <li className={Style.li}>{order.size}</li>
                                <li className={Style.li}>{order.price}</li>
                                <li className={Style.li}>{order.amount}</li>
                                <li className={Style.li}>{order.price*order.amount}</li>
                            </ul>
                })
                :<h1>You have no orders</h1>
            }
            </div> */}
            <NavLink to='/userDash'>
                <h4 className={Style.btn}>CONTROL PANEL</h4>
            </NavLink>
        </div>
    )
}

export default UserOrders;
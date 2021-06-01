import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {NavLink} from 'react-router-dom';
import {useTokenDecode} from '../../../hooks/tokenDecoding';
import ErrorNoAdminPage from '../ErrorPages/ErrorNoAdmin';
import {getOrderById} from '../../../Actions/index.js';
import Style from './OrderDetail.module.css';

export default function OrderDetail(props) {

    const dispatch=useDispatch();
    const isAdmin = useTokenDecode(localStorage.currentToken);
    const orderId = props.match.params.id;
    const [refresh, setRefresh]=useState(false);
    const orderDetail = useSelector((state) => state.ordersReducer.orderDetail);
    
    useEffect(()=>{
        dispatch(getOrderById(orderId));
    },[])

    // function handleRefresh () {
    //     console.log('REFRESH')
    //     setRefresh(!refresh)
    //   }

    return(
        isAdmin === null ? 'LOADING' : isAdmin === false ? (<ErrorNoAdminPage />) : 
        <div className={Style.Sales}>
        <div className={Style.Sales}>
            <h2 className={Style.TitleSale}>Order {orderId} Detail</h2>
            <table>
                <tr>
                    <th >Id</th>
                    <th>Shirt Id</th>
                    <th >Size</th>
                    <th >Unit Price</th>
                    <th>Quantity</th>
                    <th >Total</th>
                </tr>
                {
                    orderDetail.length>0?
                    orderDetail.map(order => {
                        return <tr>
                                    <th>{order.id}</th>
                                    <th>{order.shirtId}</th>
                                    <th>{order.size}</th>
                                    <th>{order.price}</th>
                                    <th>{order.amount}</th>
                                    <th>{order.price*order.amount}</th>
                               </tr>
                    })
                    :<h1>No details</h1>
                }
            </table>
            <div>
            <h3 className={Style.TitleSale1}>Total to pay: {orderDetail.reduce((a,c)=>a+c.amount*c.price,0)}</h3>
            </div>
           
        </div>
        <NavLink to='/sales'>
                <button className={Style.BtnChange1}>Go back to orders</button>
            </NavLink>
        </div>
    )
}
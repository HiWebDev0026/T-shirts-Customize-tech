import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {NavLink} from 'react-router-dom';
import {getOrders} from '../../../Actions/index.js';
import Style from './UserOrderDetail.module.css';

export default function OrderDetail(props) {

    const dispatch=useDispatch();
    const orderId = props.match.params.orderId;
    const [refresh, setRefresh]=useState(false);
    const allOrders = useSelector((state) => state.ordersReducer.orders);
    const allShirt = useSelector((state) => state.shirtReducer.allShirts);
    
    useEffect(()=>{
        dispatch(getOrders());
    },[refresh])

    let order = allOrders.filter(order=>parseInt(order.id) === parseInt(orderId));

    function handleRefresh () {
        setRefresh(!refresh)
    }
    
    function getShirtImage(id){
        let shirtImage = allShirt.find(image=> parseInt(image.id) === parseInt(id));
        return <div>
            <img src={shirtImage.print} className={Style.img}/>
            <h3 className={Style.name}>{shirtImage.name}</h3>
        </div>
    }


    return(
        
        <div className={Style.container}>
            <h2 className={Style.title}>Order {order.id} Detail</h2>
                {
                    order.length>0?
                    order[0].details.map(order => {
                        return <div className={Style.orderContainer}>
                                    {getShirtImage(order.shirtId)}
                                    <ul className={Style.ul}>
                                        <li className={Style.li}>Size: {order.size}</li>
                                        <li className={Style.li}>Individual Price: ${order.price}</li>
                                        <li className={Style.li}>Amount: {order.amount}</li>
                                        <li className={Style.li}>Total Price: ${parseInt(order.price) * parseInt(order.amount)}</li>
                                    </ul>
                                </div>
                    })
                    :<h1>No details</h1>
                }
            <div className={Style.btnBox}>
                <button className={Style.btn} onClick={handleRefresh}>Refresh</button>
                <NavLink to='/account'>
                    <button className={Style.btn}>Go back to orders</button>
                </NavLink>
            </div>
        </div>
    )
}
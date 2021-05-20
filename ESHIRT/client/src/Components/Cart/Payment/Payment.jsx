import './Payment.module.css'
import React from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {useState, useEffect} from 'react'
import { createPayment } from '../../../Actions';

//import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
//const {PUBLIC_KEY} = process.env

function Payment() {
    //const { user, isAuthenticated, loginWithPopup } = useAuth0()
    const items = useSelector((state)=>state.cartReducer.items)
    const paymentData = useSelector((state)=>state.paymentReducer.paymentData)
    const dispatch= useDispatch()
    

    /*
        Aca se trae el id de la orden. Para eso, 
        primero hay que hacer un dispatch con los datos
        del carrito al back y la respuesta de mercadopago.create
        nos va a dar entre otras cosas, el id de la orden
    */

    function handlePayment(){
        let order= items?.map(item => {
            return {
                title: item.title,
                quantity: item.amount,
                size: item.size,
                unit_price: item.price
            }
        })
        dispatch(createPayment(order))
    }

    /////////////////////////////////////////////////////////////

    /* 
    apartment: ""
    city_name: null
    country_name: null
    floor: ""
    state_name: null
    street_name: ""
    street_number: null
    zip_code: "" 
    */
    console.log(paymentData)
    return (
        <div>
            <button onClick={handlePayment}>Pay</button>
            {<div>{paymentData.body.operation_type || 'No data yet'}</div>}
        </div>
    )
}

export default Payment

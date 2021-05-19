import './Payment.module.css'
import React from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {useState, useEffect} from 'react'
import {createPayment} from '../../../Actions/payment.js'
//import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
//const {PUBLIC_KEY} = process.env

function Payment() {
    //const { user, isAuthenticated, loginWithPopup } = useAuth0()
    const items = useSelector((state)=>state.cartReducer.items)
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

    return (
        <div>
            {
            items?.map(item => {
                return (
                    <div>
                        <button onClick={handlePayment}>Pay</button>
                        <div>
                            Item: {item.title}
                            Size: {item.size}
                            Amout: {item.size}
                            Price: {item.price}
                        </div>
                    </div>

                )
            })
            }
        </div>
    )
}

export default Payment

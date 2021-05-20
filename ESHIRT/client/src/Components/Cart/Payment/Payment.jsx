import './Payment.module.css'
import React from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {useState, useEffect} from 'react'
import { createPayment } from '../../../Actions';

//import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
//const {PUBLIC_KEY} = process.env

function Payment() {
    
    const [deliveryData, setDeliveryData]= useState({
        zip_code: '',
        street_name: '',
        street_number: '',
        floor: '',
        apartment: '',
        city_name: '',
        state_name: '',
        country_name: ''
    })

    function handleChange(e){
        setDeliveryData({
            ...deliveryData,
            [e.target.id]: e.target.value
        })
    }
    
    function handleSubmit(){

    }

    function handlePayment(){
        if (isAuthenticated) {
            let order= items?.map(item => {
                return {
                    title: item.title,
                    quantity: item.amount,
                    size: item.size,
                    unit_price: item.price
                }
            })
            dispatch(createPayment(order))
            console.log(paymentData)
            setFlag(true)
        } else loginWithPopup()
    }

    flag ? 
    <a target='_blank' href={paymentData?.response?.init_point} rel='nofollow'>Mercadopago</a>    
        : 
    items.length >0&&<button onClick={handlePayment}>Go to pay</button>

    /* Lo de adentro del return va en shipments.receiver_address */

    return (
        <form onSubmit={handleSubmit}>
            <input placeholder= 'Zip code' id='zip_code' onChange={handleChange}/>
            <input placeholder= 'Street name' id='street_name' onChange={handleChange}/>
            <input placeholder= 'Street number' id='street_number' onChange={handleChange}/>
            <input placeholder= 'Floor' id='floor' onChange={handleChange}/>
            <input placeholder= 'Apartment' id='apartment' onChange={handleChange}/>
            <input placeholder= 'City' id='city_name' onChange={handleChange}/>
            <input placeholder= 'State' id='state_name' onChange={handleChange}/>
            <input placeholder= 'Country' id='country_name' onChange={handleChange}/>
            <button type='submit'/>
        </form>
    )
}

export default Payment

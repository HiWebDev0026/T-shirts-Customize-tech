import style from './Payment.module.css'
import React from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {useState, useEffect} from 'react'
import { createPayment } from '../../../Actions';

import { useAuth0 } from '@auth0/auth0-react';


function Payment() {
    const paymentData = useSelector((state)=>state.paymentReducer.paymentData)
    const items = useSelector((state)=>state.cartReducer.items);
    const dispatch= useDispatch()
    const {isAuthenticated}= useAuth0()
    
    const [deliveryData, setDeliveryData]= useState({
        zip_code: '',
        street_name: '',
        street_number: 0,
        floor: '',
        apartment: '',
        city_name: '',
        state_name: '',
        country_name: ''
    })
    const [flag, setFlag]= useState(false)

    function handleChange(e){
        if (e.target.id === 'street_number'){
            setDeliveryData({
                ...deliveryData,
                [e.target.id]: parseInt(e.target.value)
            })
            return;
        }
        setDeliveryData({
            ...deliveryData,
            [e.target.id]: e.target.value
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        if (!deliveryData.zip_code || !deliveryData.street_name || !deliveryData.street_number || !deliveryData.city_name || !deliveryData.state_name || !deliveryData.country_name){
            return alert('Mandatory fields not completed')
        }
        if (isAuthenticated) {
            let order= items?.map(item => {
                    return {
                        title: item.title,
                        quantity: item.amount,
                        size: item.size,
                        unit_price: item.price,
                        id: item.id

                    }
                })
            let shipments= {
                    receiver_address: deliveryData
            }  
            console.log(order, shipments)
            dispatch(createPayment(order, shipments))
            setFlag(true)
        } 
    }


    /* Lo de adentro del return va en shipments.receiver_address */



    return (
        <div className={style.container}>
        <form onSubmit={handleSubmit} className={style.form}>
            <div>Please, complete your address:</div>
            <input placeholder= 'Zip code' id='zip_code' onChange={handleChange} />
            <input placeholder= 'Street name' id='street_name' onChange={handleChange} />
            <input placeholder= 'Street number' id='street_number' onChange={handleChange} type='number' />
            <input placeholder= 'Floor' id='floor' onChange={handleChange} />
            <input placeholder= 'Apartment' id='apartment' onChange={handleChange} />
            <input placeholder= 'City' id='city_name' onChange={handleChange} />
            <input placeholder= 'State' id='state_name' onChange={handleChange} />
            <input placeholder= 'Country' id='country_name' onChange={handleChange} />
            {
                flag ? 
            <a className={(paymentData?.response?.init_point && style.mercadopago) || style.inactive} target='_blank' href={paymentData?.response?.init_point} rel='nofollow'>
                
            </a>  
                :
            items.length >0 && <button type='submit'>All set!</button>
            }
            
        </form>
        </div>
    )
}




export default Payment

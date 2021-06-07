import style from './Payment.module.css'
import React from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {useState, useEffect, useRef} from 'react'
import {useHistory} from 'react-router-dom';
import { 
    createPayment, 
    getOrdersByUserId, 
    checkLastOrder, 
    postOrder,
    putOrder,
    setCartItems,
    modifyOrderStatus
} from '../../../Actions';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import swal from 'sweetalert';


function Payment() {
    const paymentData = useSelector((state)=>state.paymentReducer.paymentData)
    const items = useSelector((state)=>state.cartReducer.items);
    const orderId = useSelector(state => state.ordersReducer.orderId)
    const dispatch= useDispatch()
    const {isAuthenticated, user}= useAuth0()
    const loadingSpinner = useRef(null);
    const history = useHistory();
    let userId= user.sub.split('|')[1]
    dispatch(getOrdersByUserId(userId))
    
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



    async function handleSubmit(e){
        e.preventDefault();
        //loadingSpinner.current.style.display = 'block';
        let unavailableStock = [];

         try {
            let shirtsWithStock = await axios({ //CHECK AND UPDATE STOCK
                                        method: 'get',
                                        url: '/order/_checkStock/'+orderId,
                                    });
            //loadingSpinner.current.style.display = 'none';

        } catch (err) {

            swal({
                title: 'ERROR',
                text: 'The shirts: '+ unavailableStock.toString() +'ran out of available stock! You can still add them to your favorites and wait for stock refill.',
                icon: 'error',
            }).then(val => {
                //loadingSpinner.current.style.display='none';
                history.push('/catalogue')
            })
            return;
        } 

        if (!deliveryData.zip_code || !deliveryData.street_name || !deliveryData.street_number || !deliveryData.city_name || !deliveryData.state_name || !deliveryData.country_name){
            return alert('Mandatory fields not completed')
        }
        let mail= document.getElementById('email').value.toLowerCase()
        if (mail.includes('@') && mail.includes('.com')){
            console.log(mail)
        } else return alert('The e-mail format does not comply')
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
            dispatch(createPayment({order, shipments, userId: user.sub.split('|')[1], email: mail}))
            setFlag(true)
            dispatch(setCartItems({}, 'clear'))
            localStorage.removeItem('items')
            dispatch(modifyOrderStatus({status: 'PENDING'}, orderId, user.sub.split('|')[1]));
        } 
    }


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
            <input placeholder= 'Email' id='email'/>
            {
                flag ? 
            
            <a
                className={(paymentData?.response?.init_point && style.mercadopago) || style.inactive} 
                target='_blank' href={paymentData?.response?.init_point} 
                rel='nofollow'
                >
            </a> 
             
                :
            items.length >0 && <button type='submit'>All set!</button>
            }
            
        </form>
        </div>
    )
}

export default Payment

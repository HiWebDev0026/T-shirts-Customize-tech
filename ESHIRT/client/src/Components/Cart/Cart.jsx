import React from 'react';
import CartItem from './CartItem/CartItem.jsx';

import './stylesCart.css';

export default function Home (){
    return(
        <div className='cart'>
            <div className='cart_left'>
                <h2>I'm the Cart</h2>
                <CartItem/>
            </div>
            <div className='cart_right'>
                <div className='cart_info'>
                    <p>Subtotal (0) items</p>
                    <p>$500</p>
                </div>
                <button className='continue-btn'>Continue</button>
            </div>
           
            
        </div>
    )
};
import React from 'react';
// import {Link} from 'react-router-dom';
import './stylesCartItem.css';

export default function CartItem (){
    return(
        <div className='cart_item'>
            <div className='cart_image'>
                <img src='https://designyourown.pk/wp-content/uploads/2017/06/design-your-own-tshirt-creo-design-02-white-programmer-t-shirt.jpg' alt='imgexample'/>
            </div>
                {/* <Link to='product/id'> */}
                <p className='cart_name'>Product Name</p>
                {/* </Link> */}
                <p>$30</p>
                <select className='cart_select'>
                    <option value='1'>1</option>
                    <option value='1'>2</option>
                    <option value='1'>3</option>
                    <option value='1'>4</option>
                    <option value='1'>5</option>
                </select>
                <button select className='cart_btn'>
                    <i>X</i>
                </button>
            </div>
    )
};
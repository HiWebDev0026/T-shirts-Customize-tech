import React from 'react';
import {NavLink} from 'react-router-dom';
import Style from './Footer.module.css';

function Footer(){
    return(
        <div className={Style.container}>   
            <h3>Design By Group 8 from Henry</h3>
            <NavLink to='/' ><h3>About Us</h3></NavLink>
        </div>
    )
}

export default Footer;
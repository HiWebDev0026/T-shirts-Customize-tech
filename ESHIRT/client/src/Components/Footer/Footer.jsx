import React from 'react';
import {NavLink} from 'react-router-dom';
import Style from './Footer.module.css';

function Footer(){
    return(
        <div className={Style.container}>   
            <h3>Design By Group 8 from Henry</h3>
            <h3><NavLink className={Style.about} to='/' >About Us</NavLink></h3>
        </div>
    )
}

export default Footer;
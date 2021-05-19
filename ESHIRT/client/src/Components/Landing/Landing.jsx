import React, { useEffect, useState } from 'react';
import Style from './Landing.module.css';
import {NavLink} from 'react-router-dom';
import A from '../../Images/1.png';
import B from '../../Images/2.png';
import C from '../../Images/3.png';
import D from '../../Images/4.png';
import E from '../../Images/5.png';
import F from '../../Images/6.png';
import G from '../../Images/7.png';
import H from '../../Images/8.png';
import I from '../../Images/9.png';







function Landing() {
    
    let arrayImg = [A, B, C, D, E, F, G, H, I];
    
    const [image, setImage] = useState();
    
    useEffect(() => {
        let buscar = 0
        const interval = setInterval(() => {
            setImage(arrayImg[buscar % arrayImg.length])
            buscar++
    }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={Style.container}>
            <h1 >Welcome to E-shirt</h1>
            <h3 className={Style.subTitle}>The place where you can desing your next shirt</h3>
            <NavLink to='./home'><button className={Style.btn}>Come on in!</button></NavLink>
            <img className={Style.img} src={image}/>
        </div>
        )
}


export default Landing;
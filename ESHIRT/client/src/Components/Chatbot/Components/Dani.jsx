import React from 'react'
import Talles from '../../../Images/dani.jpeg';
import Style from './General.module.css';

function Dani() {

    return (
        <div>
           <a href="https://randomcatgifs.com/cat-looking-at-internet/"><img src={Talles} className={Style.sizeImg} /></a> 
        </div>
    )
}

export default Dani;
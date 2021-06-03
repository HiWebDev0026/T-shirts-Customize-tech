import React from 'react'
import Talles from '../../../Images/ema.jpg';
import Style from './General.module.css';

function Ema() {

    return (
        <div>
            <img src={Talles} className={Style.sizeImg} />
        </div>
    )
}

export default Ema;
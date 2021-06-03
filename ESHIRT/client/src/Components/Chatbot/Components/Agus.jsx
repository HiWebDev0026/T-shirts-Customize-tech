import React from 'react'
import Talles from '../../../Images/agus.jpg';
import Style from './General.module.css';

function Agus() {

    return (
        <div>
            <img src={Talles} className={Style.sizeImg} />
        </div>
    )
}

export default Agus;
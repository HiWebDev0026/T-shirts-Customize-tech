import React from 'react'
import Talles from '../../../Images/eze.jpg';
import Style from './General.module.css';

function Eze() {

    return (
        <div>
            <img src={Talles} className={Style.sizeImg} />
        </div>
    )
}

export default Eze;
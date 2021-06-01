import React from 'react'
import Talles from '../../../Images/talles.png';
import Style from './General.module.css';

function CalculateSize() {

    return (
        <div>
            <img src={Talles} className={Style.sizeImg} />
        </div>
    )
}

export default CalculateSize;
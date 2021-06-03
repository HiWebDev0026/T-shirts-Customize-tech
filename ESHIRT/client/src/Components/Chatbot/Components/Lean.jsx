import React from 'react'
import Talles from '../../../Images/lean.jpeg';
import Style from './General.module.css';

function Lean() {

    return (
        <div>
            <a href="https://www.kiwilimon.com/preferencia/dietas/veganos"><img src={Talles} className={Style.sizeImg} /></a>
        </div>
    )
}

export default Lean;
import React, { useEffect, useState } from "react";
import {NavLink} from 'react-router-dom';
import Style from "./Sales.module.css";

export default function Sales() {

    return(
        <div className={Style.Sales}>
<button>
    Aca van las ventas
</button>


<NavLink to='home_admin'>
        <h3 className={Style.Btn3}>CONTROL PANEL</h3>
    </NavLink>  
        
        </div>
    )
}
import React, { useEffect, useState } from "react";
import {NavLink} from 'react-router-dom';
import Style from "./ShirtsAdmin.module.css";

export default function ShirtsAdmin() {

    return(
        <div>
<button>
    Aca van las remeras
</button>


<NavLink to='home_admin'>
        <h3 className={Style.Btn3}>CONTROL PANEL</h3>
    </NavLink>  
        
        </div>
    )
}
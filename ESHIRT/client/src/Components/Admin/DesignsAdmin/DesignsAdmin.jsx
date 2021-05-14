import React, { useEffect, useState } from "react";
import {NavLink} from 'react-router-dom';
import Style from "./DesignsAdmin.module.css";

export default function DesignsAdmin() {

    return(
        <div className={Style.Designs}>
<button>
    Aca van los diseños 
</button>


<NavLink to='home_admin'>
        <h3 className={Style.Btn3}>CONTROL PANEL</h3>
    </NavLink>  
        
        </div>
    )
}
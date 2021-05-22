import React from 'react';
import Style from './AdminData.module.css';

function AdminData(){
    return(
        <div className={Style.container}>   
            <h3 className={Style.title}>Personal Data</h3>
            <ul className={Style.ul}>
                <li>CUIT : 20-12345678-9</li>
                <li>CBU : 234476964893959596586848593229344</li>
                <li>MercadoPago account</li>
                <li>Phone : +5411343545</li>
            </ul>
        </div>
    )
}

export default AdminData;
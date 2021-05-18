import React, { useState, useEffect } from 'react'
import Style from './RecycleBin.module.css'
import {useTokenDecode} from '../../../hooks/tokenDecoding';
import ErrorNoAdminPage from '../ErrorPages/ErrorNoAdmin';



function RecycleBin() {

    const isAdmin = useTokenDecode(localStorage.currentToken)

    return (
        !isAdmin ? (<ErrorNoAdminPage />) :
        <div className={Style.container}>
            <h1>I'm trash, and yet, so useful</h1>
        </div>
    )
}


export default RecycleBin;

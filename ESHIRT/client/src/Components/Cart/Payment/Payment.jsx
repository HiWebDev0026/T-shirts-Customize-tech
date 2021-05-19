import './Payment.module.css'
import React from 'react'
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
const {PUBLIC_KEY} = process.env

function Payment() {
    const { user, isAuthenticated, loginWithPopup } = useAuth0();



    return (
        <div>
            
        </div>
    )
}

export default Payment

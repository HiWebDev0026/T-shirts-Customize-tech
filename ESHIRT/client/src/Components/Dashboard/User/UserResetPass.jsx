import React from "react";
import {NavLink} from 'react-router-dom';

function UserResetPass(){

  return (

    <div className={Style.container}>   
        
        <h1>We send you an email to change your password</h1>


    
        <NavLink to= '/userData'className={Style.btn}>
            <button > RETURN TO PERSONAL INFO</button>
        </NavLink>
  </div>
  )
};

export default UserResetPass;
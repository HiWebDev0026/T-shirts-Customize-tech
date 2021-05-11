import React, {useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import Style from './RecoveryAccount.module.css';



function RecoveryAccount(){
let value1= ""
    async function handleSubmit(e){
        alert('Password sent to ' + value1)
    }
    function handleChange(e) {
        const value = e.target.value;
        value1=value
    }

    return(
        <div>
            <form onSubmit= {handleSubmit} action='http://localhost:3000/home' onChange= {handleChange}>
        <div className={Style.titles}>
            <h1>Recover your account</h1>
            <h4>Enter your email to find your account.</h4>
<input name = 'email' className= {Style.email} type = 'email'  placeholder= 'Email:' required/>
</div>
<div className={Style.Btns}>
          <NavLink to= '/home'>
             <button className={Style.Btn1}>Cancel</button> 
             </NavLink>
            
             <button className={Style.Btn2} type='submit'>Search</button>
       
        </div>
        </form>
        </div>
    )
}

export default RecoveryAccount;
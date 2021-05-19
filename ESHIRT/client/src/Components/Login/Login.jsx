import React, {useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import Style from './Login.module.css'



function Login(){




    return(
    <div>
    <div className={Style.Contain}>

        <h1 className={Style.TitleLogin}>Login</h1>
        <input name = 'email' className= {Style.email} type = 'email'  placeholder= 'Email:'  required/>
        <input name = 'password' className= {Style.password} type = 'text'  placeholder= 'Password:'required/>
        <NavLink to='/recovery_account'>
        <h5 className={Style.Forget} >Did you forget your password?</h5>
        </NavLink>
        <NavLink to='' className={Style.Google}>
        <h3 >Login With Google</h3>
        </NavLink>
        
        <h3 className={Style.User} >You do not have an account?</h3> 
        
        </div>

        <div className={Style.User1}>
        
        <NavLink to='/home'>
        <button className={Style.Btn1}>Not now</button>
        </NavLink>
        <NavLink to='/create_user'>
        <button className={Style.Btn2}>Sign in</button>
        </NavLink>
        </div>
        </div>
    )

    
}


export default Login;
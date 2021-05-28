import React from "react";
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import Style from './Btn.module.css';
import {setCartItems} from '../Actions/cart.js';


const LogoutButton = () => {
  const { logout } = useAuth0();
 /*  const history = useHistory(); */
 const  dispatch= useDispatch();
  const unauthRedirections = [
                        '/users', 
                        '/create_user',
                        '/cart', 
                        '/designs_admin', 
                        '/account', 
                        '/sales', 
                        '/shirts_admin', 
                        '/user_detail/',
                        '/userDash',
                        '/userData',
                        '/userEdit',
                        '/userOrders', 
                        '/add_category', 
                        '/home_admin',
                        '/favorites',
                      ]
  return (
    <button className={Style.logoutBtn}
      onClick={() =>{
        
         localStorage.removeItem('currentToken')
         localStorage.removeItem('items')
         dispatch(setCartItems({}, 'clear'))
        logout({
          returnTo: unauthRedirections.includes(window.location.pathname) ? window.location.origin + '/home' : window.location.href,
        })}
      }>
      Log Out
    </button>
  );
};

export default LogoutButton;
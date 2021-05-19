import React from "react";
import {useHistory} from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import Style from './Btn.module.css';

const LogoutButton = () => {
  const { logout } = useAuth0();
 /*  const history = useHistory(); */
  const unauthRedirections = [
                        '/users', 
                        '/create_user', 
                        '/designs_admin', 
                        '/account', 
                        '/sales', 
                        '/shirts_admin', 
                        '/user_detail/', 
                        '/add_category', 
                        '/home_admin',
                      ]
  return (
    <button className={Style.logoutBtn}
      onClick={() =>{
        
         localStorage.removeItem('currentToken')
        logout({
          returnTo: unauthRedirections.includes(window.location.pathname) ? window.location.origin + '/home' : window.location.href,
        })}
      }>
      Log Out
    </button>
  );
};

export default LogoutButton;
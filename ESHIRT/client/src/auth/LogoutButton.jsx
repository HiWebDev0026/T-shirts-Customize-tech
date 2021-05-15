import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Style from './Btn.module.css';

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <button className={Style.logoutBtn}
      onClick={() =>{
        
         localStorage.setItem('currentToken', '')
        logout({
          returnTo: window.location.origin,
        })}
      }>
      Log Out
    </button>
  );
};

export default LogoutButton;
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Style from './Btn.module.css';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button onClick={() => loginWithRedirect()} className={Style.loginBtn}>
      Log In
    </button>
  );
};

export default LoginButton;
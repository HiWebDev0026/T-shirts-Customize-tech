import React from "react";

import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

import { useAuth0 } from "@auth0/auth0-react";

const AuthenticationButton = ({menuClose}) => {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? <LogoutButton menuClose={(arg)=>menuClose(arg)} /> : <LoginButton />;
};

export default AuthenticationButton;
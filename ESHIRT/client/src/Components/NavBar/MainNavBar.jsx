import React from "react";
import { useAuth0} from "@auth0/auth0-react";

import AdminNavBar from './AdminNavbar';
import UserNavBar from './UserNavBar';
import NavBar from './NavBar';

import {useTokenDecode} from '../../hooks/tokenDecoding';


const Account = () => {
    // const {isAuthenticated} = useAuth0();
    // const isAdmin = useTokenDecode(localStorage.currentToken);

  return  <NavBar />;
};

export default Account;
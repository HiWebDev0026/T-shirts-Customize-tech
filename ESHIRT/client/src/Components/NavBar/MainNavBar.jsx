import React from "react";
import { useAuth0} from "@auth0/auth0-react";

import AdminNavBar from './AdminNavbar';
import UserNavBar from './UserNavBar';
import GenericNavBar from './GenericNavBar';

import {useTokenDecode} from '../../hooks/tokenDecoding';


const Account = () => {
    // const {isAuthenticated} = useAuth0();
    // const isAdmin = useTokenDecode(localStorage.currentToken);

  return  <GenericNavBar />;
};

export default Account;
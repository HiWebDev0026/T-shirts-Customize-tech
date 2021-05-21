import React, { useEffect, useState } from "react";
// import { useAuth0} from "@auth0/auth0-react";

// import AdminNavBar from './AdminNavBar';
// import UserNavBar from './UserNavBar';
// import NavBar from './NavBar';
import GenericNavBar from './GenericNavBar';

import {useTokenDecode} from '../../hooks/tokenDecoding';



const MainNavBar = () => {

  // const [authentication, setAuthentication] = useState(false);
  // const {isAuthenticated} = useAuth0();
  // const isAdmin = useTokenDecode(localStorage.currentToken);

  // useEffect(()=>{
  //   isAuthenticated ? setAuthentication(true) : setAuthentication(false)
  // },[isAuthenticated])

  // return isAdmin && isAuthenticated ? <AdminNavBar /> : isAuthenticated ? <UserNavBar /> : <NavBar />
  return <GenericNavBar />
};

export default MainNavBar;
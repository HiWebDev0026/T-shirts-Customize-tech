import React from "react";

import HomeUser from '../HomeUser/HomeUser';
import HomeAdmin from '../Admin/HomeAdmin/HomeAdmin';
import {useTokenDecode} from '../../hooks/tokenDecoding';


const Account = () => {
  const isAdmin = useTokenDecode(localStorage.currentToken);

  return isAdmin ? <HomeAdmin /> : <HomeUser />;
};

export default Account;
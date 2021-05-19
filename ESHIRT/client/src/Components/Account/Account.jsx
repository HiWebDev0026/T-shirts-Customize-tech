import React from "react";

import HomeUser from '../HomeUser/HomeUser';
import AdminDashboard from '../Dashboard/AdminDashboard';
import {useTokenDecode} from '../../hooks/tokenDecoding';


const Account = () => {
  const isAdmin = useTokenDecode(localStorage.currentToken);

  return isAdmin ? <AdminDashboard /> : <HomeUser />;
};

export default Account;
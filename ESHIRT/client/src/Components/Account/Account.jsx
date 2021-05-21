import React from "react";

import UserDashboard from '../Dashboard/User/UserDashboard';
import AdminDashboard from '../Dashboard/Admin/AdminDashboard';
import {useTokenDecode} from '../../hooks/tokenDecoding';


const Account = () => {
  const isAdmin = useTokenDecode(localStorage.currentToken);

  return isAdmin ? <AdminDashboard /> : <UserDashboard />;
};

export default Account;
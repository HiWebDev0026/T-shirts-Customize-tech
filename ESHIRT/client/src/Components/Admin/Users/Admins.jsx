import React, { useEffect, useLayoutEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { putUser, getUserById, getUsers , getUsersByName} from "../../../Actions/index.js";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import {NavLink, Link} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import Style from "./User.module.css";
import {useTokenDecode} from '../../../hooks/tokenDecoding';
import ErrorNoAdminPage from '../ErrorPages/ErrorNoAdmin';

export default function Admins() {

  const {isAuthenticated, getAccesTokenSilently} = useAuth0();
  const isAdmin = useTokenDecode(localStorage.currentToken);
  const dispatch = useDispatch();
  const history = useHistory();
  const [count, setCount] = useState([]);
  const users = useSelector((state) => state.userReducer.allUsers);

  useEffect(() => {
    dispatch(getUsers());
}, [count]);

function handleEdit(e) {
    setCount(prevState => prevState + 1)
    alert("User " + e.target.value + " moved to trash");
    dispatch(putUser({status: 'deleted',isAdmin: 'false'}, e.target.value)); 
    history.push('/recycleBinUser');
  };

  function handleNoAdmin(e) {
    setCount(prevState => prevState + 1)
    alert("User " + e.target.value + "is admin now");
    dispatch(putUser({isAdmin: 'false'}, e.target.value)); 
    history.push('/users')
  };
  function getUserId(e) { 
    dispatch(getUserById(e.target.value));
    history.push('/user_detail');
  };

    return(
        isAdmin === null ? 'LOADING' : isAdmin === false ? (<ErrorNoAdminPage />) : <div className={Style.general}>
            <h1 className={Style.TitleCategory}>Administrators</h1>
            {users.length > 0 ? ( users.map((user) => {
      if ( user.status !== 'deleted' && user.isAdmin == true){
          return (
              <div className={Style.Tarjet}>
                <Link to={`/user_detail/${user.id}`}>
                  <button value={user.id} onClick={getUserId}>
                    {user.name}
                  </button>
                </Link>
                <p className={Style.Titles}>{user.email}</p>
                <div className={Style.Contenedores}>
                  <button className={Style.Btn1} value={user.id} onClick={handleEdit}>X</button>
                  <button className={Style.Btn1} value={user.id} onClick={handleNoAdmin}>NO Admin</button>
                </div>
            </div>
          );
      }
        })
      ) 
      : (<p> Users not found</p>)}
      <NavLink to='users'>
    <h5 className={Style.Btn3}>USERS</h5>
    </NavLink>
    <NavLink to='home_admin'>
    <h4 className={Style.Btn3}>CONTROL PANEL</h4>
    </NavLink>

        </div>
    )
}

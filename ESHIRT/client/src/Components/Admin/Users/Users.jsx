import React, { useEffect, useLayoutEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { putUser, getUserById, getUsers , getUsersByName} from "../../../Actions/index.js";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import {NavLink, Link} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import Style from "./User.module.css";
import {useTokenDecode} from '../../../hooks/tokenDecoding';
import ErrorNoAdminPage from '../ErrorPages/ErrorNoAdmin';

export default function Users() {

  const [filtered, setFiltered] = useState([]);
  const [order, setOrder] = useState([]);
  const history = useHistory();
  const {isAuthenticated, getAccesTokenSilently, user} = useAuth0();
  const isAdmin = useTokenDecode(localStorage.currentToken);
  const [count, setCount] = useState([]);

  const users = useSelector((state) => state.userReducer.allUsers);
  const usersByName = useSelector((state) => state.userReducer.usersByName);
  const dispatch = useDispatch();
  

  useEffect(() => {
        dispatch(getUsers());
  }, [count]);

  function handleEdit(e) {
    setCount(prevState => prevState + 1)
    alert("User " + e.target.value + " moved to trash");
    dispatch(putUser({status: 'deleted'}, e.target.value)); 
  };

  function handleAdmin(e) {
    setCount(prevState => prevState + 1)
    alert("User " + e.target.value + "is admin now");
    dispatch(putUser({isAdmin: 'true'}, e.target.value));
    history.push('/admins')
  };

  function getUserId(e) { 
    dispatch(getUserById(e.target.value));
    history.push('/user_detail');
  };
  //Order By names
  const AZ = (a, b) => {return a.name > b.name ? 1 : -1;};
  const ZA = (a, b) => {return b.name > a.name ? 1 : -1;};

  function handleOrder(e) {
    setOrder(e.target.value);
  };
  useEffect(() => {
    switch (order) {
      case "AZ":
        return setFiltered([...users1].sort(AZ));
      case "ZA":
        return setFiltered([...users1].sort(ZA));
      default:
        return users1;
    }
  }, [order]);
  let us = filtered.length > 0 ? filtered : users;
  let users1= usersByName.length > 0 ? usersByName : us;

  // SEARCHBAR USERS
  const [state, setState]= useState('')
  function handleChange(e) {
      setState(e.target.value)
  }

  // UPDATED by @aagenesds22: 
  // Token added in getUsersByName action. Validation working 
  function handleSubmit(e){
      e.preventDefault();
      dispatch(getUsersByName(state))
      setState('');
  }

  return (
      isAdmin === null ? 'LOADING' : isAdmin === false ? (<ErrorNoAdminPage />) : <div>
    <div className={Style.general}>
      <h1 className={Style.TitleCategory}>Users</h1>
      <div className={Style.Order}>
        <select onChange={handleOrder} className="options">
          <option  value="">ORDER</option>
          <option value="AZ">AZ</option>
          <option value="ZA">ZA</option>
        </select>
        <form onSubmit = {(e)=> handleSubmit(e)}>
                <input className={Style.inputBox} type='text' placeholder= 'Find the user' value ={state} onChange={(e)=>handleChange(e)}/>
             <input className={Style.inputBtn} type='submit' value= 'Search'/>
            </form>
      </div>
      <div className={Style.Users}>
      {users1.length > 0 ? ( users1.map((userToMap) => {
      if ( userToMap.status !== 'deleted' && userToMap.isAdmin == false){
          return (
              <div className={Style.Tarjet}>
                <Link to={`/user_detail/${userToMap.id}`}>
                  <button value={userToMap.id} onClick={getUserId}>
                    {userToMap.name}
                  </button>
                </Link>
                <p className={Style.Titles}>{userToMap.email}</p>
                <div className={Style.Contenedores}>
                  <button className={Style.Btn1} value={userToMap.id} disabled={user.sub.split('|')[1]===userToMap.id} onClick={handleEdit}>X</button>
                  <button className={Style.Btn1} value={userToMap.id} disabled={user.sub.split('|')[1]===userToMap.id} onClick={handleAdmin}>Admin</button>
                </div>
            </div>
          );
      }
        })
      ) 
      : (<p>Users not found</p>)}
      </div>
    </div>
    <div className={Style.ContBtn3}>
    <NavLink to='admins'>
    <h5 className={Style.Btn3}>ADMINISTRATORS</h5>
    </NavLink>
    <NavLink to='home_admin'>
    <h4 className={Style.Btn3}>CONTROL PANEL</h4>
    </NavLink>
</div>
</div>
  );
};

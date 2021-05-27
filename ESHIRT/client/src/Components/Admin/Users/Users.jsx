import React, { useEffect, useLayoutEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { putUser, getUserById, getUsers , getUsersByName} from "../../../Actions/index.js";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import {NavLink, Link} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import Style from "./User.module.css";
import {useTokenDecode} from '../../../hooks/tokenDecoding';
import ErrorNoAdminPage from '../ErrorPages/ErrorNoAdmin';
import swal from 'sweetalert';
import ReactPaginate from 'react-paginate';

export default function Users() {

  const [currentPage, setCurrentPage] = useState(0);
  const [filtered, setFiltered] = useState([]);
  const [order, setOrder] = useState([]);
  const history = useHistory();
  const {isAuthenticated, getAccesTokenSilently, user} = useAuth0();
  const isAdmin = useTokenDecode(localStorage.currentToken);
  const [count, setCount] = useState([]);

  const users = useSelector((state) => state.userReducer.allUsers);
  const usersByName = useSelector((state) => state.userReducer.usersByName);
  const dispatch = useDispatch();

//   let users1= [];
// shirts.map((user) => {
//   if (user.status !== 'deleted')
//    {shirts1.push({
//        id: shirt.id,
//        name: shirt.name,
//        color: shirt.color,
//        model: shirt.model,
//        size: shirt.size,
//        score: shirt.score,
//        public: shirt.public,
//        created: shirt.created
//      })
//    }})
  

  useEffect(() => {
        dispatch(getUsers());
  }, [count]);

  function handleEdit(e) {
    setCount(count + 1);
    dispatch(putUser({status: 'deleted'}, e.target.value)); 
    dispatch(getUsers());
    swal({ 
      title: "DELETE", 
      text: "User " + e.target.value + " moved to trash",
      icon: "warning",
      timer: 2000,
      padding: "0.75rem"
      });
  };

  function handleAdmin(e) {
    setCount(count +1)
    dispatch(putUser({isAdmin: 'true'}, e.target.value));
    swal({ 
      title: "User " + e.target.value + " is being converted to admin", 
      text: "please wait while the action is executed",
      icon: "success",
      timer: 4000,
      padding: "0.75rem"
      });
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
 
  ///////////PAGINATION//////////////////////////////
  const INITIAL_PAGE= 5;
  const offset = currentPage * INITIAL_PAGE;
  const pageCount = Math.ceil(users1.length / INITIAL_PAGE);
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
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
      {users1.length > 0 ? ( users1.slice(offset, offset + INITIAL_PAGE).map((userToMap) => {
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
      <div className={Style.pages}>
                    <ReactPaginate
                        previousLabel={'← Previous'}
                        nextLabel={'Next →'}
                        pageCount={pageCount}
                        onPageChange={handlePageClick}        
                        previousLinkClassName={"pagination__link"}
                        nextLinkClassName={"pagination__link"}
                        disabledClassName={Style.pagination__link__disabled}
                        activeClassName={Style.pagination__link__active}
                        containerClassName={Style.pagination}
                    />  
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

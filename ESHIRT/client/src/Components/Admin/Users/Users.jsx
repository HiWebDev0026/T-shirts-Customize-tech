import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, getUserById, getUsers } from "../../../Actions/index.js";
import {NavLink, Link} from 'react-router-dom';
import {useHistory} from 'react-router-dom'
import Style from "./User.module.css";

export default function Users() {

  const history = useHistory()
  const [filtered, setFiltered] = useState([]);
  const [order, setOrder] = useState([]);
  const [page, setPage] = useState(0);
  const [max, setMax] = useState(0);

  const users = useSelector((state) => state.userReducer.allUsers);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getUsers());
  }, []);


  function handleDelete(e) {
    alert("User " + e.target.value + " deleted");
    dispatch(deleteUser(parseInt(e.target.value)));
    
  }

  function getUserId(e) { 
    dispatch(getUserById(parseInt(e.target.value)));
    console.log("soy el value", e.target.value)
    history.push('/user_detail')
  }

  //Order By names
  const AZ = (a, b) => {return a.name > b.name ? 1 : -1;};
  const ZA = (a, b) => {return b.name > a.name ? 1 : -1;};

  function handleOrder(e) {
    setOrder(e.target.value);
    
  }

  let users1 = filtered.length > 0 ? filtered : users;
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

  //PAGINATION
  useEffect(() => {setMax(users1.length - 5); setPage(0);}, [users1]);
  const nextPage = () => { page < max && setPage(page + 5); };
  const prevPage = () => { page > 0 && setPage(page - 5); };

  return (
      <div>
    <div className={Style.general}>
      <h1 className={Style.TitleCategory}>Users</h1>
      <div className="orders">
        <select onChange={handleOrder} className="options">
          <option value="">ORDER</option>
          <option value="AZ">AZ</option>
          <option value="ZA">ZA</option>
        </select>
        <div className="buttons">
          <button onClick={prevPage} className="buttonPrev">{" "}PREV{" "}</button>
          <button onClick={nextPage} className="buttonNext">{" "}NEXT{" "}</button>
        </div>
      </div>
      {users1.length > 0 ? ( users1.slice(page, page + 5).map((user) => {
          return (
              <div className={Style.Tarjet}>
                <Link to={`/user_detail/${user.id}`}>
                  <button value={user.id} onClick={getUserId}>
                    {user.name}
                  </button>
                </Link>
                <p className={Style.Titles}>{user.name}</p>
                <p className={Style.Titles}>{user.email}</p>
                <div className={Style.Contenedores}>
                  <button className={Style.Btn1} value={user.id} onClick={handleDelete}>X</button>
                </div>
            </div>
            
          );
        })
      ) 
      : (<p>Users not found</p>)}
    </div>
    <div className={Style.ContBtn3}>
    <NavLink to='home_admin'>
        <h3 className={Style.Btn3}>CONTROL PANEL</h3>
    </NavLink>
</div>
</div>
  );
}

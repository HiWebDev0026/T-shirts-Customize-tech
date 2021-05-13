import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, getUserById, getUsers } from "../../../Actions/index.js";
import {NavLink} from 'react-router-dom';
import Style from "./User.module.css";

export default function Users() {

  const [filtered, setFiltered] = useState([]);
//   const [remove, setRemove]= useState(true);
  const [order, setOrder] = useState([]);
  const [page, setPage] = useState(0);
  const [max, setMax] = useState(0);

  const users = useSelector((state) => state.userReducer.allUsers);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    dispatch(getUserById());
  }, []);

  function handleDelete(e) {
    alert("User " + e.target.value + " deleted");
    dispatch(deleteUser(parseInt(e.target.value)));
    
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
      {users1.length > 0 
      ? ( users1.slice(page, page + 5).map((user) => {
          return (
              <div>
                  <NavLink to={`/user_detail`}> 
            <h5 className={Style.Tarjet} onClick={() => getUserById(user.id)}>
            {" "} {user.name}  {" "}
            </h5>
            </NavLink>
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
  );
}

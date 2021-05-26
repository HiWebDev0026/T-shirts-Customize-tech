import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Style from './RecycleBinUser.module.css';
import {useTokenDecode} from '../../../hooks/tokenDecoding';
import ErrorNoAdminPage from '../ErrorPages/ErrorNoAdmin';
import { deleteUser, getUsers, putUser } from '../../../Actions';
import {NavLink} from 'react-router-dom';
import swal from 'sweetalert';

function RecycleBinUser() {

    const userTotal = useSelector((state) => state.userReducer.allUsers);
    const isAdmin = useTokenDecode(localStorage.currentToken)
    const dispatch = useDispatch();
    const [count, setCount] = useState([]);

    useEffect(() => {
        dispatch(getUsers());
  }, [count]);

    function handleDelete(e) {
        setCount(count+ 1)
        dispatch(deleteUser(e.target.value)); 
        dispatch(getUsers())
        swal({ 
          title: "DELETE", 
          text: "User " + e.target.value + " deleted",
          icon: "error",
          timer: 2000,
          padding: "0.75rem"
          });        
      };

      function handleEdit(e) {
        setCount(count+ 1)
        dispatch(putUser({status: 'restored'}, e.target.value)); 
  
        dispatch(getUsers())
        swal({ 
          title: "RESTORED", 
          text: "User " + e.target.value + " restored",
          icon: "success",
          timer: 2000,
          padding: "0.75rem"
          });        
      };
      

    return (
        !isAdmin ? (<ErrorNoAdminPage />) :
        <div>
            <h2 className={Style.Title}>Users deleted</h2>
        <div className={Style.container}>
             <div className={Style.Users}>
             {userTotal.length > 0 ? ( userTotal.map((user) => {
      if (user.status == 'deleted'){
          return (
              <div className={Style.Tarjet}>
                <p className={Style.Titles}>{user.email}</p>
                <div className={Style.Contenedores}>
                  <button className={Style.Btn1} value={user.id} onClick={handleDelete}>X</button>
                  <button className={Style.Btn1} value={user.id} onClick={handleEdit}>Restore</button>
                </div>
            </div>
          );
      }
        })
      ) 
      : (<p>Users not found</p>)}
    </div>
    <NavLink to='recycleBin'>
    <h4 className={Style.Btn3}>RECYCLE BIN</h4>
    </NavLink>
    <NavLink to='home_admin'>
    <h4 className={Style.Btn3}>CONTROL PANEL</h4>
    </NavLink>
           </div>
        </div>
    )
}
export default RecycleBinUser;
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Style from './RecycleBinUser.module.css';
import {useTokenDecode} from '../../../hooks/tokenDecoding';
import ErrorNoAdminPage from '../ErrorPages/ErrorNoAdmin';
import { deleteUser, getUsers, putUser } from '../../../Actions';
import {NavLink} from 'react-router-dom';
import swal from 'sweetalert';
import ReactPaginate from 'react-paginate';


function RecycleBinUser() {

    const [currentPage, setCurrentPage] = useState(0);
    const userTotal = useSelector((state) => state.userReducer.allUsers);
    const isAdmin = useTokenDecode(localStorage.currentToken)
    const dispatch = useDispatch();
    const [count, setCount] = useState([]);

    let users= [];
     userTotal.map((user) => {
    if (user.status === 'deleted')
     {users.push({
         id: user.id,
         name: user.name,
         status: user.status,
         email: user.email
       })
     }})

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

       ///////////PAGINATION//////////////////////////////
  const INITIAL_PAGE= 5;
  const offset = currentPage * INITIAL_PAGE;
  const pageCount = Math.ceil(users.length / INITIAL_PAGE);
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
}

    return (
        !isAdmin ? (<ErrorNoAdminPage />) :
        <div>
            <h2 className={Style.Title}>Users deleted</h2>
        <div className={Style.container}>
             <div className={Style.Users}>
             {users.length > 0 ? ( users.slice(offset, offset + INITIAL_PAGE).map((user) => {
          return (
              <div className={Style.Tarjet}>
                <p className={Style.Titles}>{user.name}</p>
                <p className={Style.Titles}>{user.email}</p>
                <div className={Style.Contenedores}>
                  <button className={Style.Btn1} value={user.id} onClick={handleDelete}>X</button>
                  <button className={Style.Btn1} value={user.id} onClick={handleEdit}>Restore</button>
                </div>
            </div>
          );
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
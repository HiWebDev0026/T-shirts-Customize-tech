import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Style from './RecycleBinShirt.module.css';
import {useTokenDecode} from '../../../hooks/tokenDecoding';
import ErrorNoAdminPage from '../ErrorPages/ErrorNoAdmin';
import {useHistory} from 'react-router-dom';
import swal from 'sweetalert';
import ReactPaginate from 'react-paginate';

import {NavLink} from 'react-router-dom';
import { deleteShirt, putShirt , getShirts} from '../../../Actions';

function RecycleBinShirt() {

    const [currentPage, setCurrentPage] = useState(0);
    const shirts= useSelector((state) => state.shirtReducer.allShirts);
    const isAdmin = useTokenDecode(localStorage.currentToken);
    const [count, setCount] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
      dispatch(getShirts());
    }, [count]);

    function handleDelete(e) {

        dispatch(deleteShirt(e.target.value)); 
        setCount(count +1);
        dispatch(getShirts());
        dispatch(getShirts());
        swal({ 
          title: "DELETE", 
          text: "Shirt " + e.target.value + " deleted",
          icon: "error",
          timer: 2000,
          padding: "0.75rem"
          });   
      };

      function handleEdit(e) {
        dispatch(putShirt({status: 'restored'}, e.target.value)); 
        setCount(count + 1);
        dispatch(getShirts());
        dispatch(getShirts());
        swal({ 
          title: "RESTORED", 
          text: "Shirt " + e.target.value + " restored",
          icon: "success",
          timer: 2000,
          padding: "0.75rem"
          });
      };

       ///////////PAGINATION//////////////////////////////
  const INITIAL_PAGE= 5;
  const offset = currentPage * INITIAL_PAGE;
  const pageCount = Math.ceil(shirts.length / INITIAL_PAGE);
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
}

    return (
        !isAdmin ? (<ErrorNoAdminPage />) :
        <div className={Style.General}>
          <div className={Style.TitleContainer}>
            <h2 className={Style.Title}>Shirts deleted</h2>
            </div>
            <div className={Style.Container2}>
            {shirts.length > 0 
      ? (shirts.slice(offset, offset + INITIAL_PAGE).map((shirt) => {
        if ( shirt.status == 'deleted'){
          return (
            <div className={Style.Container}>
              <div className={Style.Tarjet} >
              <th className={Style.Titles1}> {shirt.id}</th>
              <th className={Style.Titles2}> {shirt.name}</th>
              <th className={Style.Titles3}> {shirt.color}</th>
              <button className={Style.Btn1} value={shirt.id} onClick={handleDelete}>X</button>
              <button className={Style.Btn1} value={shirt.id} onClick={handleEdit}>Restore</button>
              </div>
               </div>
          );
        }
        })
      ) 
      : (<p>Shirts not found</p>)}
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
    )
}


export default RecycleBinShirt;
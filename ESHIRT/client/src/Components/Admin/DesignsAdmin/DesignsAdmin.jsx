import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {NavLink} from 'react-router-dom';
import { getShirts, deleteShirt, getShirtById, putShirt} from "../../../Actions/index";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import {useHistory} from 'react-router-dom';
import Style from "./DesignsAdmin.module.css";
import {useTokenDecode} from '../../../hooks/tokenDecoding';
import ErrorNoAdminPage from '../ErrorPages/ErrorNoAdmin';
import ReactPaginate from 'react-paginate';

export default function DesignsAdmin() {

const [currentPage, setCurrentPage] = useState(0);
const [editButtonTarget, setEditButtonTarget] = useState(0);
const [change, setChange]=useState('');
const designsTotal = useSelector((state) => state.shirtReducer.allShirts);
const dispatch = useDispatch();
const history = useHistory();
const isAdmin = useTokenDecode(localStorage.currentToken);
const [filtered, setFiltered] = useState([]);
const [order, setOrder] = useState([]);

let designs= [];
designsTotal.map((desing) => {
if (desing.public === 'pending')
{designs.push({
    id: desing.id,
    name: desing.name,
    print: desing.print
  })
}})

    useEffect(() => {
      dispatch(getShirts());
    }, []);

   function getShirtId(e) { 
        dispatch(getShirtById(e.target.value));
        history.push('/design_detail');
      }

      //Order By names
 function handleOrder(e) {
  setOrder(e.target.value);
};
const AZ = (a, b) => {return a.name > b.name ? 1 : -1;};
const ZA = (a, b) => {return b.name > a.name ? 1 : -1;};

      useEffect(() => {
        switch (order) {
          case "AZ":
            return setFiltered([...designs].sort(AZ));
          case "ZA":
            return setFiltered([...designs].sort(ZA));
          default:
            return designs;
        }
      }, [order]);

      let Total = filtered.length > 0 ? filtered : designs ;

      //////////////PAGINATION/////////////////////
      const INITIAL_PAGE= 6;
  const offset = currentPage * INITIAL_PAGE;
  const pageCount = Math.ceil(Total.length / INITIAL_PAGE);
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
}

    return(
      
      isAdmin === null ? 'LOADING' : isAdmin === false ? (<ErrorNoAdminPage />) : 
      <div className={Style.General}>
     
        <h1 className={Style.Title}>DESINGS WAITING FOR APPROVAL</h1>
        
        <select onChange={handleOrder} className={Style.Options}>
          <option  value="">ORDER</option>
          <option value="AZ">AZ</option>
          <option value="ZA">ZA</option>
        </select>
        <div className={Style.Designs}>


{Total.length > 0  
      ? ( Total.slice(offset, offset + INITIAL_PAGE).map((shirt) => {
        
          return (
            <div className={Style.Designs1}>
              <div className={Style.Tarjet}>
              <button onClick={getShirtId} value={shirt.id} className={Style.Titles2}> {shirt.name} </button>
              <div><img src={shirt.print} className={Style.Img}/></div>
             
              </div>
               </div>
          );
        
        })
      ) 
      : (<p>Desings not found</p>)}
      
     
      
    <div className={Style.pagination}>
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
                <div className={Style.Btn}>
                <NavLink to='recycleBinDesigns'>
        <h5 className={Style.Btn3}>UNAPPROVED DESIGNS</h5>
    </NavLink>  
    <NavLink to='buy_authorize'>
        <h5 className={Style.Btn3}>BUY AUTHORIZE DESIGNS</h5>
    </NavLink>  
        <NavLink to='home_admin'>
        <h4 className={Style.Btn4}>CONTROL PANEL</h4>
    </NavLink>  
    </div>
        </div>
        </div>
    )
}
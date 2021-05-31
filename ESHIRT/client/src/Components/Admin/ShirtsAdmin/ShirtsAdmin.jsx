import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {NavLink} from 'react-router-dom';
import { getShirts, deleteShirt, putShirt, getShirtById} from "../../../Actions";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Style from "./ShirtsAdmin.module.css";
import {useTokenDecode} from '../../../hooks/tokenDecoding';
import ErrorNoAdminPage from '../ErrorPages/ErrorNoAdmin';
import {useHistory} from 'react-router-dom';
import swal from 'sweetalert';
import ReactPaginate from 'react-paginate';

export default function ShirtsAdmin() {

const [currentPage, setCurrentPage] = useState(0);
const shirts = useSelector((state) => state.shirtReducer.allShirts);
const history = useHistory();
const dispatch = useDispatch();
const [count, setCount] = useState(0);
const isAdmin = useTokenDecode(localStorage.currentToken);

let shirts1= [];
shirts.map((shirt) => {
  if (shirt.status !== 'deleted')
   {shirts1.push({
       id: shirt.id,
       name: shirt.name,
       color: shirt.color,
       model: shirt.model,
       size: shirt.size,
       score: shirt.score,
       public: shirt.public,
       created: shirt.created
     })
   }})
  
    useEffect(() => {
      dispatch(getShirts());
      
    },[ count ]);
  
      function handleEdit(e) {
        swal({
          title: "ARE YOU SURE?",
          text: "The shirt is going to move to trash",
          dangerMode: true,
          buttons: ["CANCEL", "DELETE"]
        }).then(respuesta =>{
          if(respuesta){
        e.preventDefault();
        setCount(count + 1);
        dispatch(putShirt({status: 'deleted'}, e.target.value));
        dispatch(getShirts());
        dispatch(getShirts()); 
        swal({ 
          title: "DELETE", 
          text: "Shirt " + e.target.value + " moved to trash",
          dangerMode: true,
          icon: "warning",
          timer: 3000,
          padding: "0.75rem"
          });
      };})}

      function getShirtId(e) { 
        dispatch(getShirtById(e.target.value));
      };
      
      // useEffect(() => {setMax(shirts.length - 10); setPage(0);}, [count]);
      // const nextPage = () => { page < max && setPage(page + 10); };
      // const prevPage = () => { page > 0 && setPage(page - 10); };
    
      const INITIAL_PAGE= 8;
      const offset = currentPage * INITIAL_PAGE;
      const pageCount = Math.ceil(shirts1.length / INITIAL_PAGE);
      function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
    }
      
    return(
      isAdmin === null ? 'LOADING' : isAdmin === false ? (<ErrorNoAdminPage />) : <div>
        <div className={Style.General} >
          <h1>SHIRTS</h1>
        <table id="table-to-xls">
        <div id='tableShirts'>
            <br/>
            <tr>
            <div className={Style.Shirts} >
             <th className={Style.Title1}> Id</th>
              <th className={Style.Title2}> Name</th>
              <th className={Style.Title3}> Color</th>
              <th className={Style.Title4}> Model</th>
              <th className={Style.Title5}>Size</th>
              <th className={Style.Title6}> Score</th>
              <th className={Style.Title7}> public</th>
              <th className={Style.Title8}> Created</th>
              </div>
              </tr>
              </div>
            {shirts1.length > 0  ? ( shirts1.slice(offset, offset + INITIAL_PAGE).map((shirt) => {
             
          return (
            <tr className={Style.Container}>
              <div className={Style.Tarjet} >
              <th className={Style.Titles1}> {shirt.id}</th>
              <th className={Style.Titles2}> {shirt.name}</th>
              <th className={Style.Titles3}> {shirt.color}</th>
              <th className={Style.Titles4}> {shirt.model}</th>
              <th className={Style.Titles5}> {shirt.size}</th>
              <th className={Style.Titles6}> {shirt.score}</th>
              <th className={Style.Titles7}> {shirt.public}</th>
              <th className={Style.Titles8}> {shirt.created_by_user}</th>
              <th><button className={Style.Btn1} value={shirt.id} onClick={handleEdit}>X</button></th>
              <NavLink to={`/shirt_detail/${shirt.id}`} onClick={getShirtId} className={Style.Detail}>Detail</NavLink>
              </div>
               </tr>
          );
        
        })
      ) 
      : (<p>Shirts not found</p>)}
      </table>
      <br />
      <div>
      <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="table-to-xls"
                    filename="shirtsxls"
                    sheet="shirtsxls"
                    buttonText="Download as XLS"/>
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
      {/* <div className={Style.Buttons}>
          <button onClick={prevPage} className="buttonPrev">{" "}PREV{" "}</button>
          <button onClick={nextPage} className="buttonNext">{" "}NEXT{" "}</button>
        </div> */}

<NavLink to='home_admin'>
<h4 className={Style.Btn3}>CONTROL PANEL</h4>
    </NavLink>  
    </div>
        </div>
    );
};
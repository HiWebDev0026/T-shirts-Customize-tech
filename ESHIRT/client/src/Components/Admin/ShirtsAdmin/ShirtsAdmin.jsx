import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {NavLink} from 'react-router-dom';
import { getShirts, deleteShirt, putShirt, getShirtById} from "../../../Actions";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Style from "./ShirtsAdmin.module.css";
import {useTokenDecode} from '../../../hooks/tokenDecoding';
import ErrorNoAdminPage from '../ErrorPages/ErrorNoAdmin';
import {useHistory} from 'react-router-dom';

export default function ShirtsAdmin() {

const shirts = useSelector((state) => state.shirtReducer.allShirts);
const history = useHistory();
const dispatch = useDispatch();
const [page, setPage] = useState(0);
const [max, setMax] = useState(0);
const [count, setCount] = useState(0);
const isAdmin = useTokenDecode(localStorage.currentToken);



  
    useEffect(() => {
      dispatch(getShirts());
      
    },[ count ]);
  
      function handleEdit(e) {
        e.preventDefault();
        setCount(count + 1)
        dispatch(putShirt({status: 'deleted'}, e.target.value));
        dispatch(getShirts())
        alert("Shirt " + e.target.value + " moved to trash"); 
        dispatch(getShirts()) 
         
      };

      function getShirtId(e) { 
        dispatch(getShirtById(e.target.value));
        /* setTimeout(()=> history.push('/shirt_detail'), 0); */
      };
      
      useEffect(() => {setMax(shirts.length - 10); setPage(0);}, [count]);
      const nextPage = () => { page < max && setPage(page + 10); };
      const prevPage = () => { page > 0 && setPage(page - 10); };
    
      
    return(
      isAdmin === null ? 'LOADING' : isAdmin === false ? (<ErrorNoAdminPage />) : <div>
        <div className={Style.General} >
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
            {shirts.length > 0  ? ( shirts.slice(page, page + 10).map((shirt) => {
              if ( shirt.status !== 'deleted'){
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
              <NavLink to={`/shirt_detail/${shirt.id}`} onClick={getShirtId}>Detail</NavLink>
              </div>
               </tr>
          );
        }
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
      <div className={Style.Buttons}>
          <button onClick={prevPage} className="buttonPrev">{" "}PREV{" "}</button>
          <button onClick={nextPage} className="buttonNext">{" "}NEXT{" "}</button>
        </div>

<NavLink to='home_admin'>
<h4 className={Style.Btn3}>CONTROL PANEL</h4>
    </NavLink>  
    </div>
        </div>
    );
};
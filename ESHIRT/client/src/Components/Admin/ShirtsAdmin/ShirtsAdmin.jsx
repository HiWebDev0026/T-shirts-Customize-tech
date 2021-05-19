import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {NavLink} from 'react-router-dom';
import { getShirts, deleteShirt, putShirt } from "../../../Actions";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Style from "./ShirtsAdmin.module.css";
import {useTokenDecode} from '../../../hooks/tokenDecoding';
import ErrorNoAdminPage from '../ErrorPages/ErrorNoAdmin';

export default function ShirtsAdmin() {

const shirtsTotal = useSelector((state) => state.shirtReducer.allShirts);
const dispatch = useDispatch();
const [page, setPage] = useState(0);
const [max, setMax] = useState(0);
const isAdmin = useTokenDecode(localStorage.currentToken);
  
let shirts= [];
  shirtsTotal.map((shirt) => {
      if ( shirt.status !== 'deleted'){
      return shirts.push({
          id: shirt.id,
          name: shirt.name,
          color: shirt.color,
          model: shirt.model,
          size: shirt.size,
          score: shirt.score,
          public: shirt.public,
          created: shirt.created,
          status: shirt.status
      })
  }
  })

    useEffect(() => {
      dispatch(getShirts());
    }, [shirts]);
  
    // function handleDelete(e) {
    //     alert("Shirt " + e.target.value + " deleted");
    //     dispatch(deleteShirt(parseInt(e.target.value))); 
    //   };
      function handleEdit(e) {
        alert("Shirt " + e.target.value + " moved to trash");
        dispatch(putShirt({status: 'deleted'}, e.target.value)); 
      };
      
      useEffect(() => {setMax(shirts.length - 10); setPage(0);}, []);
      const nextPage = () => { page < max && setPage(page + 10); };
      const prevPage = () => { page > 0 && setPage(page - 10); };
    
      
    return(
      !isAdmin ? (<ErrorNoAdminPage />) : <div>
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
            {shirts.length > 0 
      ? ( shirts.slice(page, page + 10).map((shirt) => {
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
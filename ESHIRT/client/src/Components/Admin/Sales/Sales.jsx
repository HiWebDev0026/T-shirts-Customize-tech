import React, { useEffect, useState } from "react";
import {NavLink} from 'react-router-dom';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Style from "./Sales.module.css";
import {useTokenDecode} from '../../../hooks/tokenDecoding';
import ErrorNoAdminPage from '../ErrorPages/ErrorNoAdmin';

const sales= [{id: 2, total_price: 250, status: "pending", createdAt: "525", updateAt: 521, userId: 1, details: []}];
export default function Sales() {

  const isAdmin = useTokenDecode(localStorage.currentToken);

    return(
        !isAdmin ? (<ErrorNoAdminPage />) : <div className={Style.Sales}>
             <table id="table-to-xls">
        <div className={Style.Shirts} id='tableSales'>
            <br/>
            <tr>
             <th className={Style.Title1}> -------------Id-----------</th>
              <th className={Style.Title2}> ------------Total Price------------</th>
              <th className={Style.Title4}> -------------Status-------------</th>
              <th className={Style.Title6}> ------------CreateAt-----------</th>
              <th className={Style.Title7}> -------------UpdateAt-----------</th>
              <th className={Style.Title8}> ----------UserId-----------</th>
              <th className={Style.Title9}> --------------Details--------------------</th>
              </tr>
              </div>
             
              {sales.length > 0 
      ? ( sales.map((sales) => {
          return (
            <tr>
              <div className={Style.Tarjet} >
              <th className={Style.Titles1}> {sales.id}</th>
              <th className={Style.Titles2}> {sales.total_price}</th>
              <th className={Style.Titles3}> {sales.status}</th>
              <th className={Style.Titles4}> {sales.createdAt}</th>
              <th className={Style.Titles5}> {sales.updateAt}</th>
              <th className={Style.Titles6}> {sales.userId}</th>
              <th className={Style.Titles7}> {sales.details}</th>
              </div>
               </tr>
          );
        })
      ) 
      : (<p>Sales not found</p>)}
              
               </table>
               <br/>

      <div>
      <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="table-to-xls"
                    filename="salesxls"
                    sheet="shirtsxls"
                    buttonText="Download as XLS"/>
      </div>

<NavLink to='home_admin'>
        <h3 className={Style.Btn3}>CONTROL PANEL</h3>
    </NavLink>  
        
        </div>
    );
};
import React, { useEffect, useState } from "react";
import {NavLink} from 'react-router-dom';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Style from "./Sales.module.css";
import {useTokenDecode} from '../../../hooks/tokenDecoding';
import ErrorNoAdminPage from '../ErrorPages/ErrorNoAdmin';
import { useSelector, useDispatch } from "react-redux";

import {getOrders} from '../../../Actions/index.js'

// const sales= [{id: 2, total_price: 250, status: "pending", createdAt: "525", updateAt: 521, userId: 1, details: []}];
export default function Sales() {
  
  const isAdmin = useTokenDecode(localStorage.currentToken);

  const [refresh, setRefresh]=useState(false);
  const dispatch = useDispatch();
  const sales = useSelector((state) => state.ordersReducer.orders);
  console.log('SALES')
  
  useEffect(()=>{
    dispatch(getOrders());
  },[refresh])

  function handleClick (e) {
    console.log(e.target.id)
  }

  function handleRefresh () {
    console.log('REFRESH')
    setRefresh(!refresh)
  }

    return(
        !isAdmin ? (<ErrorNoAdminPage />) : <div className={Style.Sales}>
        <table id="table-to-xls">
            <tr>
             <th >Id</th>
              <th>Total Price</th>
              <th >Status</th>
              <th >CreateAt</th>
              <th>UpdateAt</th>
              <th >UserId</th>
              <th >Details</th>
            </tr>
            {
              sales.length > 0? 
              sales.map((s) => {
                  return <tr>
                                <th> {s.id}</th>
                                <th> {s.total_price}</th>
                                <th> {s.status}</th>
                                <th> {s.createdAt.slice(0,10)}</th>
                                <th> {s.updateAt?.slice(0,10)}</th>
                                <th> {s.userId}</th>
                                <th><button id={s.id} onClick={handleClick}>Details</button></th>
                          </tr>
              })
              : <p>Sales not found</p>
            }
        </table>
      <div>
      <div>
        <button onClick={handleRefresh}>Refresh</button>
      </div>
        <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="download-table-xls-button"
            table="table-to-xls"
            filename="salesxls"
            sheet="shirtsxls"
            buttonText="Download as XLS"
        />
      </div>
      <NavLink to='home_admin'>
        <h4 className={Style.Btn3}>CONTROL PANEL</h4>
      </NavLink>  
</div>
    );
};
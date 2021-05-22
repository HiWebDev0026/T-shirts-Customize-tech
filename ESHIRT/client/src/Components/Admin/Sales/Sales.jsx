import React, { useEffect, useState } from "react";
import {NavLink} from 'react-router-dom';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Style from "./Sales.module.css";
import {useTokenDecode} from '../../../hooks/tokenDecoding';
import ErrorNoAdminPage from '../ErrorPages/ErrorNoAdmin';
import { useSelector, useDispatch } from "react-redux";

import {getOrders} from '../../../Actions/index.js'

export default function Sales() {
  
  const isAdmin = useTokenDecode(localStorage.currentToken);

  // const [refresh, setRefresh]=useState(false);
  const dispatch = useDispatch();
  const sale = useSelector((state) => state.ordersReducer.orders);
  const [filtered, setFiltered] = useState([]);
  const [order, setOrder] = useState([]);
  
  
  useEffect(()=>{
    dispatch(getOrders());
  },[])

    function handleRefresh () {
    setFiltered([])
  }
  /////////////////////FILTER BY STATUS///////////////////////////////
  let reloaded = [];
  function handleFilter(e) {
    for (let i = 0; i < sale.length; i++) {
      if (sale[i].status === e.target.value) {reloaded.push(sale[i]);}
    }
    if(reloaded.length === 0){alert("Not match")}
    setFiltered(reloaded);}
  
  const STRENGTHUP = (a,b) => {return b.total_price - a.total_price}
const STRENGTHDN = (a,b) => {return a.total_price - b.total_price}

  let sales = filtered.length > 0 ? filtered : sale
  let statusSales= ['CART', 'PENDING', 'APPROVED', 'DISPATCHED', 'DONE', 'CANCELED']
  useEffect(() => {
    switch(order){
      case 'STRENGTHUP': return setFiltered([...sales].sort(STRENGTHUP))
      case 'STRENGTHDN': return setFiltered([...sales].sort(STRENGTHDN))
      default: return sales
    }}, [order])
    
    function handleOrder(e){
      setOrder(e.target.value)
    }
    

    return(
        !isAdmin ? (<ErrorNoAdminPage />) : <div className={Style.Sales}>
        <div>
          <h2>Orders</h2>
          <select onChange={handleOrder} className= 'options'>
  <option value =''>ORIGINAL</option>
  <option value ='STRENGTHUP'>PRICE+</option>
  <option value ='STRENGTHDN'>PRICE-</option>
</select>
<div className="searchs">

        <select onChange={handleFilter}className="type1">
          {statusSales.map((temp) => {
            return <option value={temp}>{temp} </option>; //Template
          })}
        </select>
 </div>

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
                                  <th>
                                    <NavLink to={`order_detail/${s.id}`}>
                                      <button id={s.id}>Details</button>
                                    </NavLink>
                                  </th>
                            </tr>
                })
                : <p>Sales not found</p>
              }
          </table>
          <div>
          <h4>Total sales: ${sales.reduce((a,c)=>a+c.total_price,0)}</h4>
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
        </div>
    );
};

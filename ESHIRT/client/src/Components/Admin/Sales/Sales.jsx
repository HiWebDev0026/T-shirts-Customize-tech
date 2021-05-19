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
  console.log("aca sales", sale)
  
  useEffect(()=>{
    dispatch(getOrders());
  },[])

  function handleClick (e) {
    console.log(e.target.id)
  }

  function handleRefresh () {
    setFiltered([])
  }
  const STRENGTHUP = (a,b) => {return b.total_price - a.total_price}
const STRENGTHDN = (a,b) => {return a.total_price - b.total_price}

  let sales = filtered.length > 0 ? filtered : sale
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
                                      <button id={s.id} onClick={handleClick}>Details</button>
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

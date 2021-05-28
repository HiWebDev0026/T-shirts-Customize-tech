import React, { useEffect, useState } from "react";
import {NavLink} from 'react-router-dom';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Style from "./Sales.module.css";
import {useTokenDecode} from '../../../hooks/tokenDecoding';
import ErrorNoAdminPage from '../ErrorPages/ErrorNoAdmin';
import { useSelector, useDispatch } from "react-redux";
import swal from 'sweetalert';
import ReactPaginate from 'react-paginate';

import {getOrders, modifyOrderStatus} from '../../../Actions/index.js'

export default function Sales() {
  
  const isAdmin = useTokenDecode(localStorage.currentToken);

  // const [refresh, setRefresh]=useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const dispatch = useDispatch();
  const sale = useSelector((state) => state.ordersReducer.orders);
  const [filtered, setFiltered] = useState([]);
  const [order, setOrder] = useState([]);
  const [count, setCount] = useState([]);

  let ids= [""];
  sale.map((temp) => {
    return ids.push(temp.id)
  })
  useEffect(()=>{
    dispatch(getOrders());
  },[count])

    function handleRefresh () {
    setFiltered([])
  }

  /////////////////////FILTER BY STATUS///////////////////////////////
  let reloaded = [];
  function handleFilter(e) {
    for (let i = 0; i < sale.length; i++) {
      if (sale[i].status === e.target.value) {reloaded.push(sale[i]);}
      if (sale[i].userId === e.target.value) {reloaded.push(sale[i])}
    }
    if(reloaded.length === 0){alert("Not match")}
    setFiltered(reloaded);}

const STRENGTHUP = (a,b) => {return b.total_price - a.total_price}
const STRENGTHDN = (a,b) => {return a.total_price - b.total_price}
const DATAUP = (a,b) => {return b.createdAt.slice(2,10).split('-') - a.createdAt.slice(2,10).split('-')}
const DATADN = (a,b) => {return a.createdAt.slice(2,10).split('-') - b.createdAt.slice(2,10).split('-')}

//////////////////ORDER BY DATE//////////////////////
function sortByDate(a, b) {
  if (a.createdAt < b.createdAt) { return 1;}
  if (a.createdAt > b.createdAt) {return -1;}
  return 0;}
function sortByDate2(a, b) {
  if (a.createdAt > b.createdAt) {return 1;}
  if (a.createdAt < b.createdAt) {return -1;}
  return 0;}

  let sales = filtered.length > 0 ? filtered : sale;
  let statusSales= ['By Status', 'CART', 'PENDING', 'APPROVED', 'DISPATCHED', 'DONE', 'CANCELED','CANCELED BY ADMIN'];
  let statusSales2= ['status',  'DISPATCHED', 'DONE', 'CANCELED BY ADMIN'];
  
  let idsUsuarios= ['By User ID']
  sale.map((id) =>{
     if(idsUsuarios.indexOf(id.userId) === - 1){idsUsuarios.push(id.userId)}
  })
  
  useEffect(() => {
    switch(order){
      case 'STRENGTHUP': return setFiltered([...sales].sort(STRENGTHUP))
      case 'STRENGTHDN': return setFiltered([...sales].sort(STRENGTHDN))
      case 'sortByDate': return setFiltered([...sales].sort(sortByDate))
      case 'sortByDate2': return setFiltered([...sales].sort(sortByDate2))

      default: return sales
    }}, [order])
    
    function handleOrder(e){
      setOrder(e.target.value)
    }
    const [input, setInput] = useState({
      name: '' })
    function handleChange1(e) {
      const value = parseInt(e.target.value);
      const name = e.target.name
  
      setInput({
          ...input,
          [name]: value
      });
  }
////////////////EDIT STATUS////////////////////////////////
    function handleEdit(e) {
     setCount(count +1)
      let index= input.name
      dispatch(modifyOrderStatus({status: e.target.value}, index)); 
      dispatch(getOrders());
      dispatch(getOrders());
      swal({ 
        title: "MODIFIED", 
        text: "Order " + e.target.value + " modified",
        icon: "success",
        timer: 2500,
        padding: "0.75rem"
        });
        e.target.value= "status"
    };
//////////PAGINATION////////////////////////////////////////////////////////////////
    const INITIAL_PAGE= 8;
    const offset = currentPage * INITIAL_PAGE;
    const pageCount = Math.ceil(sales.length / INITIAL_PAGE);
    function handlePageClick({ selected: selectedPage }) {
      setCurrentPage(selectedPage);
    }
    
    return(
        !isAdmin ? (<ErrorNoAdminPage />) : <div className={Style.Sales}>
        <div>
          <h2>Orders</h2>
          <select onChange={handleOrder} className= 'options'>
  <option value =''>BY PRICE</option>
  <option value ='STRENGTHUP'>PRICE+</option>
  <option value ='STRENGTHDN'>PRICE-</option>
</select>
<select onChange={handleOrder} className= 'options'>
  <option value =''>BY DATE</option>
  <option value ='sortByDate'>DATE +</option>
  <option value ='sortByDate2'>DATE -</option>
</select>
<div className="searchs">
<h2>FILTER</h2>
        <select onChange={handleFilter}className="type1">
          {statusSales.map((temp) => {
            return <option value={temp}>{temp} </option>; //Template
          })}
        </select>
        <select onChange={handleFilter}className="type1">
          {idsUsuarios.map((temp) => {
            return <option value={temp}>{temp} </option>; //Template
          })}
        </select>
 </div>
<h2>MODIFY THE STATUS</h2>
 <input name = 'name' className= 'name' placeholder='Write the id number' onChange={handleChange1} />
 <select onChange={handleEdit}className="type1">
          {statusSales2.map((temp) => {
           return <option value={temp}> {temp} </option>; //Template
          })}
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
                sales.slice(offset, offset + INITIAL_PAGE).map((s) => {
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
          </div>
          <NavLink to='home_admin'>
            <h4 className={Style.Btn3}>CONTROL PANEL</h4>
          </NavLink>  
          </div>
        </div>
    );
};

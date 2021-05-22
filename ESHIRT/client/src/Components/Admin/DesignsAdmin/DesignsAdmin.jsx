import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {NavLink} from 'react-router-dom';
import { getShirts, deleteShirt, getShirtById, putShirt} from "../../../Actions/index";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import {useHistory} from 'react-router-dom';
import Style from "./DesignsAdmin.module.css";
import {useTokenDecode} from '../../../hooks/tokenDecoding';
import ErrorNoAdminPage from '../ErrorPages/ErrorNoAdmin';

export default function DesignsAdmin() {

const [editButtonTarget, setEditButtonTarget] = useState(0);
const [change, setChange]=useState('');
const designs = useSelector((state) => state.shirtReducer.allShirts);
const dispatch = useDispatch();
const history = useHistory();
const isAdmin = useTokenDecode(localStorage.currentToken);
const [filtered, setFiltered] = useState([]);
const [order, setOrder] = useState([]);

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

    return(
      
      isAdmin === null ? 'LOADING' : isAdmin === false ? (<ErrorNoAdminPage />) : <div className={Style.General}>
        <h1 className={Style.Title}>DESINGS WAITING FOR APPROVAL</h1>
        <select onChange={handleOrder} className={Style.Options}>
          <option  value="">ORDER</option>
          <option value="AZ">AZ</option>
          <option value="ZA">ZA</option>
        </select>
        <div className={Style.Designs}>


{Total.length > 0  
      ? ( Total.map((shirt) => {
        if (shirt.public === 'pending'){
          return (
            <div className={Style.Designs1}>
              <div className={Style.Tarjet}>
              <button onClick={getShirtId} value={shirt.id} className={Style.Titles2}> {shirt.name} </button>
             
              </div>
               </div>
          );
        }
        })
      ) 
      : (<p>Desings not found</p>)}
      


    
        </div> 
        <NavLink to='recycleBinDesigns'>
        <h5 className={Style.Btn2}>UNAPPROVED DESIGNS</h5>
    </NavLink>  
        <NavLink to='home_admin'>
        <h4 className={Style.Btn3}>CONTROL PANEL</h4>
    </NavLink>  
        </div>
    )
}
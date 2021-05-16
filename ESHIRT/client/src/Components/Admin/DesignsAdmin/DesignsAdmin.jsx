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

const [editButtonTarget, setEditButtonTarget] = useState(0)
const [change, setChange]=useState('');
const shirts = useSelector((state) => state.shirtReducer.allShirts);
const dispatch = useDispatch();
const history = useHistory()
const isAdmin = useTokenDecode(localStorage.currentToken);
// Desings in true for approval
let designs= [];
shirts.map((shirt) => {
    if (shirt.public !== true){
    return designs.push({
        name: shirt.name,
        id: shirt.id
    })
}
})
    useEffect(() => {
      dispatch(getShirts());
    }, []);

   

      function getShirtId(e) { 
        dispatch(getShirtById(e.target.value));
        history.push('/design_detail');
      }

    return(
      
        !isAdmin ? (<ErrorNoAdminPage />) : <div className={Style.General}>
        <h1 className={Style.Title}>DESINGS WAITING FOR APPROVAL</h1>
        <div className={Style.Designs}>


{designs.length > 0  
      ? ( designs.map((shirt) => {
          return (
            <div>
              <div className={Style.Tarjet}>
              <button onClick={getShirtId} value={shirt.id} className={Style.Titles2}> {shirt.name} </button>
             
              </div>
               </div>
          );
        })
      ) 
      : (<p>Desings not found</p>)}
      
<NavLink to='home_admin'>
        <h4 className={Style.Btn3}>CONTROL PANEL</h4>
    </NavLink>  
    
        </div>
        </div>
    )
}
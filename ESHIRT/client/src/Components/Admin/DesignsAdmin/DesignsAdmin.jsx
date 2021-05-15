import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {NavLink} from 'react-router-dom';
import { getShirts, deleteShirt, getShirtById, putShirt} from "../../../Actions/index";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Style from "./DesignsAdmin.module.css";

export default function DesignsAdmin() {

const shirts = useSelector((state) => state.shirtReducer.allShirts);
const dispatch = useDispatch();

// for(let i = 0; i<shirts.length; i ++){
//     console.log(shirts.name[i])
// }
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

    function handleDelete(e) {
        alert("Shirt " + e.target.value + " deleted");
        dispatch(deleteShirt(parseInt(e.target.value))); 
      };

      function getShirtById(e) { 
        dispatch(getShirtById(parseInt(e.target.value)));
    //     history.push('/design_detail');
    //   };
      }


    return(
        <div className={Style.Designs}>
<h2 className={Style.Title}>Designs waiting for approval</h2>

{designs.length > 0 
      ? ( designs.map((shirt) => {
          return (
            <tr>
              <div className={Style.Tarjet} >
              <th className={Style.Titles1}> {shirt.id}</th>
              <th className={Style.Titles2}> {shirt.name}</th>
              <th><button className={Style.Btn1} value={shirt.id} onClick={handleDelete}>X</button></th>
              </div>
               </tr>
          );
        })
      ) 
      : (<p>Desings not found</p>)}
<NavLink to='home_admin'>
        <h3 className={Style.Btn3}>CONTROL PANEL</h3>
    </NavLink>  
        
        </div>
    )
}
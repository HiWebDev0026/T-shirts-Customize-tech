import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {NavLink} from 'react-router-dom';
import { getShirts, deleteShirt, getShirtById} from "../../../Actions/index";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Style from "./DesignsAdmin.module.css";

export default function DesignsAdmin() {

const shirts = useSelector((state) => state.shirtReducer.allShirts);
const dispatch = useDispatch();
  
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
<button>
    Aca van los diseños 
</button>


<NavLink to='home_admin'>
        <h3 className={Style.Btn3}>CONTROL PANEL</h3>
    </NavLink>  
        
        </div>
    )
}
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {NavLink} from 'react-router-dom';
import { getShirts, deleteShirt, getShirtById, putShirt} from "../../../Actions/index";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import {useHistory} from 'react-router-dom';
import Style from "./DesignsAdmin.module.css";

export default function DesignsAdmin() {

const [editButtonTarget, setEditButtonTarget] = useState(0)
const [change, setChange]=useState('');
const shirts = useSelector((state) => state.shirtReducer.allShirts);
const dispatch = useDispatch();
const history = useHistory()
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
        alert("Design " + e.target.value + " deleted");
        dispatch(deleteShirt(parseInt(e.target.value))); 
      };

      function getShirtId(e) { 
        dispatch(getShirtById(parseInt(e.target.value)));
        history.push('/design_detail');
    
      }

      function handleEdit (e) {
       
        dispatch(putShirt({'public':true}));
    }

    return(
        <div className={Style.Designs}>
<h2 className={Style.Title}>Designs waiting for approval</h2>

{designs.length > 0 
      ? ( designs.map((shirt) => {
          return (
            <div>
              <div className={Style.Tarjet}>
                
              <button onClick={getShirtId} value={shirt.id} className={Style.Titles2}> {shirt.name}</button>
              <button className={Style.Btn1} value={shirt.id} onClick={handleDelete}>REMOVE</button>
              <button className={Style.Btn2} value={shirt.id} onClick={handleEdit}>APPROVAL </button>
              </div>
               </div>
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
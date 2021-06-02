import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getShirtById, deleteShirt , putShirt } from "../../../Actions/index";
import {NavLink} from 'react-router-dom';
import {useTokenDecode} from '../../../hooks/tokenDecoding';
import ErrorNoAdminPage from '../ErrorPages/ErrorNoAdmin';
import {useHistory} from 'react-router-dom';
import Style from "./DesignDetail.module.css";
import swal from 'sweetalert';


export default function DesignDetail (){

const designs = useSelector((state) => state.shirtReducer.shirtId);
const dispatch = useDispatch();
const history = useHistory();
const [input2, setInput2] = useState('');


function handleDelete(e) {
    swal({
        title: "ARE YOU SURE?",
        text: "The desing is going to delete definitely",
        dangerMode: true,
        buttons: ["CANCEL", "DELETE"]
      }).then(respuesta =>{
        if(respuesta){
    dispatch(deleteShirt(parseInt(e.target.value))); 
    swal({ 
        title: "DELETE", 
        text: "Design " + e.target.value + " moved to unapproval desings",
        dangerMode: true,
        icon: "warning",
        timer: 3500,
        padding: "0.75rem"
        });
    history.push('/desings_admin')
  };})}

  function handlePublic(e) {
    const value = e.target.value;
    setInput2(
        value
    );
}
  function handleEdit (e) {
    if(input2.length >0){  
    e.preventDefault();
    dispatch(putShirt({public: input2 === 'true' ? true : false}, designs.id));
    swal({ 
        title: "NOTICE", 
        text: "Design " + e.target.value + " modified",
        icon: "success",
        timer: 3500,
        padding: "0.75rem"
        });
    history.push('/desings_admin');
    }    
}

const isAdmin = useTokenDecode(localStorage.currentToken);

return(
    isAdmin === null ? 'LOADING' : isAdmin === false ? (<ErrorNoAdminPage />) : 
    <div className={Style.Designs}>
<h2 className={Style.Title}>DO YOU WANT TO APPROVAL?</h2>
{
        <div className={Style.Container}> 
         <p className={Style.Name}>{designs.name}</p>
         <img src={designs.print} className={Style.Img}/>
         <div className={Style.Btns}>
         
        <form>
        
            <div className={Style.Formulario}>
                <div>
         <label>Public</label>
                    <input type="radio" name="public" value="true" onChange= {handlePublic} />
                    <label >No Public</label>
                    <input type="radio" name="public" value="false" onChange= {handlePublic}  />
                    </div>
                    <button className={Style.Btn2} value={designs.id} type='submit' onClick={handleEdit} >Submit</button>
                    </div>
                    </form>
         <br></br> <br></br>
         </div>
         <div><button className={Style.BtnDelete} value={designs.id} onClick={handleDelete}>REMOVE</button> </div>
        </div>

   
}

   <NavLink to='/desings_admin' >
        <h5 className={Style.Btn3}>DESINGS</h5>
    </NavLink> 

   <NavLink to='home_admin'>
        <h4 className={Style.Btn3}>CONTROL PANEL</h4>
    </NavLink> 

        </div>
    )
}
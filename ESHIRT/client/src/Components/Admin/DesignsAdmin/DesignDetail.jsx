import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getShirtById, deleteShirt , putShirt } from "../../../Actions/index";
import {NavLink} from 'react-router-dom';
import {useTokenDecode} from '../../../hooks/tokenDecoding';
import ErrorNoAdminPage from '../ErrorPages/ErrorNoAdmin';
import {useHistory} from 'react-router-dom';
import Style from "./DesignDetail.module.css";


export default function DesignDetail (){

const designs = useSelector((state) => state.shirtReducer.shirtId);
const dispatch = useDispatch();
const history = useHistory();
const [input2, setInput2] = useState('');


function handleDelete(e) {
    alert("Design " + e.target.value + " deleted");
    dispatch(deleteShirt(parseInt(e.target.value))); 
    history.push('/desings_admin')
  };

  function handlePublic(e) {
    const value = e.target.value;
    setInput2(
        value
    );
}
  function handleEdit (e) {
    if(input2.length >0){  
    alert("Design " + e.target.value + "modified");
    e.preventDefault();
    dispatch(putShirt({public: input2 === 'true' ? true : false}, designs.id));
    history.push('/desings_admin');
    }    
}

const isAdmin = useTokenDecode(localStorage.currentToken);

return(
    isAdmin === null ? 'LOADING' : isAdmin === false ? (<ErrorNoAdminPage />) : <div className={Style.Designs}>
{
        <div className={Style.Container}> 
         <p className={Style.Name}>{designs.name}</p>
         <p className={Style.Color}>{designs.color}</p>
         <img src={designs.print} className={Style.Img}/>
         <div className={Style.Btns}>
        <form>
         <label>Yes</label>
                    <input type="radio" name="public" value="true" onChange= {handlePublic} />
                    <label >No</label>
                    <input type="radio" name="public" value="false" onChange= {handlePublic}  />
                    </form>
         <button className={Style.Btn2} value={designs.id} type='submit' onClick={handleEdit} >APPROVAL</button>
         </div>
         <div><button className={Style.Btn1} value={designs.id} onClick={handleDelete}>REMOVE</button> </div>
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
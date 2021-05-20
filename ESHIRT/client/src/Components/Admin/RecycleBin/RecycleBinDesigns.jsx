import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {NavLink} from 'react-router-dom';
import { getShirts, deleteShirt, getShirtById, putShirt} from "../../../Actions/index";
import {useHistory} from 'react-router-dom';
import {useTokenDecode} from '../../../hooks/tokenDecoding';
import ErrorNoAdminPage from '../ErrorPages/ErrorNoAdmin';
import Style from "./RecycleBinDesigns.module.css"


export default function RecycleBinDesigns(){

    const shirts = useSelector((state) => state.shirtReducer.allShirts);
    const dispatch = useDispatch();
    const history = useHistory();
    const isAdmin = useTokenDecode(localStorage.currentToken);
    const [input2, setInput2] = useState('');

    useEffect(() => {
      dispatch(getShirts());
    }, []);

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
        dispatch(putShirt({public: input2 === 'true' ? true : false}, e.target.value));
        history.push('/desings_admin');
        }    
    }

    return(
        !isAdmin ? (<ErrorNoAdminPage />) : <div className={Style.General}>
            <div className={Style.Designs1}></div>
{shirts.length > 0  
      ? ( shirts.map((shirt) => {
        if (shirt.public !== 'true'){
          return (
            <div className={Style.Designs1}>
              <div className={Style.Tarjet}>
              <img src={shirt.print} className={Style.Image}/>
         <div className={Style.Btns}>
        <form>
         <label>Yes</label>
                    <input type="radio" name="public" value="true" onChange= {handlePublic} />
                    <label >No</label>
                    <input type="radio" name="public" value="false" onChange= {handlePublic}  />
                    </form>
         <button className={Style.Btn2} value={shirt.id} type='submit' onClick={handleEdit} >APPROVAL</button>
         </div>
         <div><button className={Style.Btn1} value={shirt.id} onClick={handleDelete}>REMOVE</button> </div>
        </div>
             
              </div>
               
          );
        }
        })
      ) 
      : (<p>Desings not found</p>)}


<NavLink to='recycleBin'>
    <h4 className={Style.Btn3}>RECYCLE BIN</h4>
    </NavLink>
    <NavLink to='home_admin'>
    <h4 className={Style.Btn3}>CONTROL PANEL</h4>
    </NavLink>
        </div>
    )
}
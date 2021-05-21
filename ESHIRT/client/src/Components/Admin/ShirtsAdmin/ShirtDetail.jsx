import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {NavLink} from 'react-router-dom';
import { getShirts, deleteShirt, putShirt, getShirtById } from "../../../Actions";
import {getCategories} from '../../../Actions'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Style from "./ShirtDetail.module.css";
import {useTokenDecode} from '../../../hooks/tokenDecoding';
import ErrorNoAdminPage from '../ErrorPages/ErrorNoAdmin';
import {useHistory} from 'react-router-dom';

export default function ShirtDetail() {
const categories = useSelector((state)=> state.categoryReducer.allCategories)
const shirt = useSelector((state) => state.shirtReducer.shirtId);
const history = useHistory();
const dispatch = useDispatch();
const [count, setCount] = useState([]);
const [temp, SetTemp] = useState([]);
const isAdmin = useTokenDecode(localStorage.currentToken);

const [input, setInput] = useState({
    name: '',
    color: '',
    model: '',
    size: '',
   
});

useEffect(() => {
    dispatch(getShirtById());
    dispatch(getCategories());
}, []);

function handleChange(e) {
    const value = e.target.value;
    const name = e.target.name

    setInput({
        ...input,
        [name]: value
    });
}

let array= []
function handleChange1(e) {
     array.push([parseInt(e.target.value)])
}

function handleEdit(e) {
    alert('Shirt modified')
dispatch(putShirt({...input, categories: array}, e.target.value)); 
history.push('/shirts_admin')
}

return(
    !isAdmin ? (<ErrorNoAdminPage />) : <div className={Style.General}>
<div className={Style.Tarjet} >
              <th className={Style.Titles1}> {shirt.id}</th>
              <th className={Style.Titles2}> {shirt.name}</th>
              <th className={Style.Titles3}> {shirt.color}</th>
              <th className={Style.Titles4}> {shirt.model}</th>
              <th className={Style.Titles5}> {shirt.size}</th>
              <th className={Style.Titles6}> {shirt.score}</th>
              <th className={Style.Titles7}> {shirt.public}</th>
              <th className={Style.Titles8}> {shirt.created_by_user}</th>
              <img src={shirt.print} className={Style.Image}/>
              </div>
              <div className={Style.Changes}>
              <h5 className={Style.ChangesTitle}>Do you want to change it?</h5>
                 <input name = 'name' className= 'name' type = 'text' placeholder= 'Name:' onChange= {handleChange} required/>
                 <input name = 'color' className= 'color' type = 'text' placeholder= 'Color:' onChange= {handleChange} required/>
                 <input name = 'model' className= 'model' type = 'text' placeholder= 'Model:' onChange= {handleChange} required/>
                 <input name = 'size' className= 'size' type = 'text' placeholder= 'Size:' onChange= {handleChange} required/>
                 <div className={Style.Categories}>
                        <label className={Style.ChangesTitle} for="categories">Chose the categories of the shirt: </label>
                        <select className={Style.Categories1} onChange={handleChange1} name="categories">
                            {categories.map((elem, index) => (<option className={Style.Categories1} value={elem.id} key={index}>{elem.name}</option>))}
                        </select>
                    </div>
                 
                 <button className={Style.BtnChange} value={shirt.id} type='submit' onClick={handleEdit}>Change</button>      
                           
                    </div>
<NavLink to='shirts_admin'>
    <h4 className={Style.Btn3}>SHIRTS</h4>
    </NavLink>  
<NavLink to='home_admin'>
    <h4 className={Style.Btn3}>CONTROL PANEL</h4>
    </NavLink>  
    </div>
)
}
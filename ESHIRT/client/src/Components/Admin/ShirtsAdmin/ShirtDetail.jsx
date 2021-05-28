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
import swal from 'sweetalert';

export default function ShirtDetail(props) {
const categories = useSelector((state)=> state.categoryReducer.allCategories)
const shirt = useSelector((state) => state.shirtReducer.shirtId);
const history = useHistory();
const dispatch = useDispatch();
const [count, setCount] = useState([]);
const [temp, SetTemp] = useState([]);
const isAdmin = useTokenDecode(localStorage.currentToken);

console.log(shirt)
const [input, setInput] = useState({
    name: '',
    color: '',
    model: '',
    size: '',
    price: '',
   
});

useEffect(() => {
    dispatch(getShirtById(props.match.params.id));
    dispatch(getCategories());
}, []);


function handleChange(e) {
    const value = e.target.name === 'price' ? parseInt(e.target.value) : e.target.value;
    const name = e.target.name

    setInput({
        ...input,
        [name]: value
    });
}

let array= []
function handleChange1(e) {
    let index= parseInt(e.target.value);
    if(array.indexOf(index) === -1){
     array.push(index)
}}


function handleEdit(e) {
    
    if(!array){array= shirt.categories[0].id}
    if(!input.name){input.name= shirt.name}
    if(!input.color){input.color= shirt.color}
    if(!input.model){input.model= shirt.model}
    if(!input.size){input.size = shirt.size}
    if(!input.price) {input.price = shirt.price}
 
        if(array.length>0){dispatch(putShirt({...input, categories: array}, e.target.value)); }
        else{dispatch(putShirt({...input}, e.target.value))}
        swal({ 
            title: "MODIFIED", 
            text: "Shirt " + e.target.value + " modified , wait for the changes",
            icon: "success",
            timer: 3000,
            padding: "0.75rem"
            });
        history.push('/shirts_admin')
}

return(
    isAdmin === null ? 'LOADING' : isAdmin === false ?  (<ErrorNoAdminPage />) : <div className={Style.General}>
<div className={Style.Tarjet} >
              <th className={Style.Titles1}> {shirt.id}</th>
              <th className={Style.Titles2}> {shirt.name}</th>
              <th className={Style.Titles3}> {shirt.color}</th>
              <th className={Style.Titles4}> {shirt.model}</th>
              <th className={Style.Titles5}> {shirt.size}</th>
              <img src={shirt.print} className={Style.Image}/>
              </div>
              <div className={Style.Changes}>
              <h5 className={Style.ChangesTitle}>Do you want to change it?</h5>
                 <input name = 'name' className= 'name' type = 'text' placeholder= {shirt.name} onChange= {handleChange} required/>
                 <input name = 'color' className= 'color' type = 'text' placeholder= {shirt.color} onChange= {handleChange} required/>
                 <input name = 'model' className= 'model' type = 'text' placeholder= {shirt.model} onChange= {handleChange} required/>
                 <input name = 'price' className='name' type='text' placeholder={shirt.price} onChange={handleChange} />
                 <select name = 'size' className='size' onChange= {handleChange} >
                 <option  value="">size</option>
                 <option value='S'>S</option>
                 <option value='M'>M</option>
                 <option value='L'>L</option>
                 <option value='XL'>XL</option>
                 <option value='XXL'>XXL</option>
                 </select>
                 <div className={Style.Categories}>
                        <label className={Style.ChangesTitle} for="categories">Chose the categories of the shirt: </label>
                        <select className={Style.Categories1} onChange={handleChange1} name="categories">
                            {categories.map((elem, index) => (<option className={Style.Categories1} value={elem.id} key={index}>{elem.name}</option>))}
                        </select>
                    </div>
                 
                 <button className={Style.BtnChange} value={shirt.id} type='submit' onClick={handleEdit}>Change</button>      
                           
                    </div>
<NavLink to='/shirts_admin'>
    <h4 className={Style.Btn3}>SHIRTS</h4>
    </NavLink>  
<NavLink to='/home_admin'>
    <h4 className={Style.Btn3}>CONTROL PANEL</h4>
    </NavLink>  
    </div>
)
}
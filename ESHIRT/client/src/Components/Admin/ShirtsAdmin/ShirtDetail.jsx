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
import axios from 'axios';

export default function ShirtDetail(props) {
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
    public: '',
    price: '',
    stock: ''
   
});

useEffect(() => {
    dispatch(getShirtById(props.match.params.id));
    dispatch(getCategories());
}, []);


function handleChange(e) {
    const value = e.target.name === 'price' || e.target.name === 'stock' ? parseInt(e.target.value) : e.target.value;
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

function handleStockChange(e){
    if(typeof input.stock === 'number' ){
axios({
    method: 'put',
    url: '/shirt/_admin/_stock',
    data: 
        {
            shirtId: props.match.params.id,
            quantity: input.stock
        }          
})
return;}
return;
}

function handleStock(){
    if(shirt.stock === 0){
        return swal({ 
            title: 'No stock of', 
            text: shirt.name,
            icon: "warning",
            timer: 3000,
            padding: "0.75rem"
            });
    }
    swal({ 
        title: shirt.stock + ' units is your stock of', 
        text: shirt.name,
        icon: "success",
        timer: 3000,
        padding: "0.75rem"
        });
}

function handleConsult(){
    let names=[];
    for(let i = 0 ; i<shirt.categories.length ; i ++){
    names.push(' '+ shirt.categories[i].name)
    swal({ 
        title: names, 
        text: "The category",
        icon: "success",
        timer: 3000,
        padding: "0.75rem"
        });
}
if(names.length === 0){
    swal({ 
        title: "Category", 
        text: "NOT FOUND",
        icon: "warning",
        timer: 2000,
        padding: "0.75rem"
        });
}}

function handleEdit(e) {
    e.preventDefault();
    if(!array){array= shirt.categories[0].id}
    if(!input.name){input.name= shirt.name}
    if(!input.color){input.color= shirt.color}
    if(!input.model){input.model= shirt.model}
    if(!input.size){input.size = shirt.size}
    if(!input.price) {input.price = shirt.price}
    if(!input.public) {input.public = shirt.public}
    
        if(array.length>0){dispatch(putShirt({...input, categories: array}, e.target.value));handleStockChange()}
        else{dispatch(putShirt({...input}, e.target.value)) ; handleStockChange()}
        
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
    isAdmin === null ? 'LOADING' : isAdmin === false ?  (<ErrorNoAdminPage />) : 
    <div className={Style.Total}>
        <h2 className={Style.ChangesTitle}>Do you want to change it?</h2>
    
    <div className={Style.General}>
        
<div className={Style.Tarjet} >
              
              <img src={shirt.print} className={Style.Image}/>
              </div>
             
             <div className={Style.Change}>
              
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
                 <select name = 'public' className='public' onChange= {handleChange} >
                 <option  value="">PUBLIC</option>
                 <option value='false'>CANCEL</option>
                 </select>
                 <h5>STOCK</h5>


                 <input  type="range" 
                        onChange={handleChange} 
                        value={input.stock} 
                        name="stock"
                        min={0} 
                        max={100} 
                        step={1}></input> <span>{input.stock}</span>
                        <button className={Style.BtnConsult} onClick={handleStock}>CONSULT STOCK</button>
               </div>
               
                 <div className={Style.Categories}>
                        <label className={Style.ChangesCategory} for="categories">Choose the categories of the shirt: </label>
                        <select className={Style.Categories1} onChange={handleChange1} name="categories">
                            {categories.map((elem, index) => (<option className={Style.Categories1} value={elem.id} key={index}>{elem.name}</option>))}
                        </select>
                        <button className={Style.BtnConsult} onClick={handleConsult}>CONSULT CATEGORY</button>
                    </div>
                    </div>

                    <div className={Style.BtnChange}>
                 <button className={Style.BtnChange1} value={shirt.id} type='submit' onClick={handleEdit}>Change</button>      
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
import React, {useState} from 'react';
import { useDispatch } from "react-redux";
import { useAuth0} from "@auth0/auth0-react";
import { putUser } from '../../../Actions/index';
import {NavLink} from 'react-router-dom';
import Style from './UserEdit.module.css';
import {useHistory} from 'react-router-dom';

function  UserEdit() {
    
    const dispatch = useDispatch();
    const history = useHistory();
    const {user} = useAuth0();
    const {sub} = user;
    let id = sub.split("|")[1];

    const [input, setInput] = useState({
        name: '',
        lastname: '',
        email: '',
        country: '',
        city: '',
        adress: '',
        phone :''
    });

    function resetInput(){
        setInput({
            name: '',
            lastname: '',
            email: '',
            country: '',
            city: '',
            adress: '',
            phone :''
        })
    }

    
    const handleInputChange = (e)=>{
        setInput({
            ...input, [e.target.name]: e.target.value
        })
    }

    function validatePost(){
        let objToPost = {}
        for(const each in input){
            if(input[each] !== ''){
                objToPost[each] = input[each];
            }
        }
        return objToPost;
    }
    
    
    function handleSubmit(e){
        e.preventDefault();
        let obj = validatePost();
        dispatch(putUser(obj, id));
        console.log(obj);
        resetInput();   
        history.push('/userData');

    }
    
    return (

        <div className={Style.container}>
            <div className={Style.box}>

            <form className={Style.form} onSubmit={(e)=>handleSubmit(e)}>
                <h3>Here you can modify your personal information</h3>

                <input className={Style.input} type="text" name="name" onChange={handleInputChange}  value={input.name} placeholder='Name'/>
                <input className={Style.input} type="text" name="lastname" onChange={handleInputChange} value={input.lastname}  placeholder='Lastname' />
                <input className={Style.input} type="text" name="email" onChange={handleInputChange}  value={input.email}  placeholder='Email'/>
                <input className={Style.input} type="text" name="country" onChange={handleInputChange} value={input.country}  placeholder='Country' />
                <input className={Style.input} type="text" name="city" onChange={handleInputChange} value={input.city}  placeholder='City' />
                <input className={Style.input} type="text" name="adress" onChange={handleInputChange} value={input.adress}  placeholder='Address' />
                <input className={Style.input} type="text" name="phone" onChange={handleInputChange} value={input.phone}  placeholder='Phone' />
        
                <input className={Style.submitBtn} type="submit" value= 'Submit' />
            </form>
            
            </div>
            <NavLink to='/userDash'>
                <h4 >CONTROL PANEL</h4>
            </NavLink>
        </div>
    )
}


export default UserEdit;
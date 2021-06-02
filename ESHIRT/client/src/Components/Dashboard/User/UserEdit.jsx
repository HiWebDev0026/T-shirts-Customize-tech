import React, {useState} from 'react';
import { useDispatch } from "react-redux";
import { useAuth0} from "@auth0/auth0-react";
import { putUser } from '../../../Actions/index';
import {NavLink} from 'react-router-dom';
import Style from './UserEdit.module.css';
import {useHistory} from 'react-router-dom';
import { useSelector} from "react-redux";

function  UserEdit() {
    
    const dispatch = useDispatch();
    const history = useHistory();
    const {user} = useAuth0();
    const {sub} = user;
    let id = sub.split("|")[1];
    const userDB = useSelector((state) => state.userReducer.userId);
    console.log("user", userDB)

    const [input, setInput] = useState({
        name: userDB.name || '',
        lastname: userDB.lastname || '',
        email: userDB.email ||'',
        country: userDB.country ||'',
        city: userDB.city ||'',
        adress: userDB.adress ||'',
        phone : userDB.phone || ''
    });

    function resetInput(){
        setInput({
            name: userDB.name || '',
            lastname: userDB.lastname || '',
            email: userDB.email ||'',
            country: userDB.country ||'',
            city: userDB.city ||'',
            adress: userDB.adress ||'',
            phone : userDB.phone || ''
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
        resetInput();   
        history.push('/userData');

    }
    
    return (

        <div className={Style.container}>
            <div className={Style.box}>

            <form className={Style.form} onSubmit={(e)=>handleSubmit(e)}>
                <h3 className={Style.title}>Here you can modify your personal information</h3>

                <input className={Style.input} type="text" name="name" onChange={handleInputChange}  value={input.name} placeholder={userDB.name || 'name'}/>
                <input className={Style.input} type="text" name="lastname" onChange={handleInputChange} value={input.lastname}  placeholder={userDB.lastname ||'Lastname'} />
                <input className={Style.input} type="text" name="email" onChange={handleInputChange}  value={input.email}  placeholder={userDB.email ||'Email'}/>
                <input className={Style.input} type="text" name="country" onChange={handleInputChange} value={input.country}  placeholder={userDB.country ||'Country'} />
                <input className={Style.input} type="text" name="city" onChange={handleInputChange} value={input.city}  placeholder={userDB.city ||'City'} />
                <input className={Style.input} type="text" name="adress" onChange={handleInputChange} value={input.adress}  placeholder={userDB.adress ||'Address'} />
                <input className={Style.input} type="text" name="phone" onChange={handleInputChange} value={input.phone}  placeholder={userDB.phone ||'Phone'} />
        
                <input className={Style.submitBtn} type="submit" value= 'Submit' />
            </form>
            
            </div>
            <NavLink to='/userDash'>
                <button className={Style.btn}>CONTROL PANEL</button>
            </NavLink>
        </div>
    )
}


export default UserEdit;
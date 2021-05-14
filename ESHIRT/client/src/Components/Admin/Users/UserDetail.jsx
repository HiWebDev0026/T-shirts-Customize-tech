import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { putUser, getUserById } from "../../../Actions/index.js";
import {NavLink} from 'react-router-dom';
import Style from "./UserDetail.module.css";

export default function UserDetail ({match}){

    const [edit, setEdit] = useState(false);
    const [dataToModify, setDataToModify] = useState({});
    const user = useSelector((state) => state.userReducer.userId);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(user)
        console.log(match.params.id)
        if (parseInt(user.id) !== parseInt(match.params.id)) {
            dispatch(getUserById(match.params.id))
        }
    })
    
    function validateDataToModify () {
        const result = {}
        for (const field in dataToModify) {
            if (dataToModify[field]) {
                if (field === 'phone') {
                    result[field] = parseInt(dataToModify[field])    
                }
                result[field] = dataToModify[field]
            }
        }
        return result;
    }
    

    function handleChange (e) {
        e.preventDefault();
        setDataToModify(
            {
                ...dataToModify, 
                [e.target.name]: e.target.value
            }
        )
    }

    function handleSubmit (e) {
        e.preventDefault();
        console.log(dataToModify)
        dispatch(putUser(validateDataToModify(dataToModify), user.id))
    }

    function handleClick(e) {
        e.preventDefault();
        setEdit(!edit)
    }


    function showEditInput (fieldToEdit){
        return (
        <div>
            <input type= "text" name={fieldToEdit} onChange={(e) => handleChange(e)}></input>
        </div>
        )
    }

    function setDataToDisplay () {
        const fields = ['name', 'lastname', 'email', 'country', 'city', 'adress', 'phone']
        console.log(user, 'set to display')
        return (
            <div>
                {fields.map(field => {
                    return (
                        <div key={user[field]}>
                            <p>{field}</p>
                            <p>{user[field]}</p>
                            {edit && showEditInput(field)}
                        </div>
                    )
                })}
            </div>
        )
    }


    return (
        <div style={{color: 'white'}}>
            <form onSubmit={handleSubmit}>
                <div >
                    <h2 >User detail</h2>
                    {setDataToDisplay()}

                    <div>                    
                        <button  onClick={handleClick}> Edit </button>
                    </div>

                </div>
                
                {edit && <input type='submit' ></input>}
            </form>
            <NavLink to='home_admin'>
                <h3 className={Style.Btn3}>CONTROL PANEL</h3>
            </NavLink>
            
             
        </div>
    )
}
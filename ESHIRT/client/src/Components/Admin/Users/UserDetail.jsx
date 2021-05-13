import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { putUser, getUserById } from "../../../Actions/index.js";
import {NavLink} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import Style from "./UserDetail.module.css";

export default function UserDetail (){

    const [edit,setEdit] = useState(false);
    const [change, setChange]=useState('');
    const [editButtonTarget, setEditButtonTarget] = useState(0);
    const history = useHistory();

const user = useSelector((state) => state.userReducer.userId);
const dispatch = useDispatch();

useEffect(() => {
    dispatch(getUserById(user.id));
  }, []);

  function handleEdit (e) {
    alert('User modified')
    dispatch(putUser({'name':change},editButtonTarget));
    setEdit(!edit);
    setChange('');
    history.push('/users');
}

function showEditbutton (){
    return (
    <div>
        <input type='text' value={change} placeholder='type new name' onChange={(e)=> setChange(e.target.value)}/>
        <input className={Style.Btn} type='submit' onClick={handleEdit}/>
        <button onClick={(e)=>setEditButtonTarget(false)}>Done</button>
    </div>
    )
    }

    return (
        <div className={Style.Title}>
            
            <div className={Style.Tarjet}>
            <div className={Style.Titles1}>
            <h2 className={Style.Detail}>User detail</h2>
              <p>{user.name}</p>
              <p>{user.lastname}</p>
              <p>{user.email}</p>
              <p>{user.country}</p>
              <p>{user.city}</p>
              <p>{user.adress}</p>
              <p>{user.phone}</p>
              <div>
            <button className={Style.Btn2} value={user.id} onClick={(e)=>setEditButtonTarget(e.target.value)}>Edit</button>
                                    {editButtonTarget == user.id && showEditbutton()}
              </div>
              </div>
              </div>
              <NavLink to='home_admin'>
        <h3 className={Style.Btn3}>CONTROL PANEL</h3>
    </NavLink>  
        </div>
    );
};
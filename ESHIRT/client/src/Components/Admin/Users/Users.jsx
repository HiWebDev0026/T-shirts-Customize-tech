import React,{useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Style from './User.module.css';

import { getUsers } from '../../../Actions/index.js';

export default function Users (){

    useEffect(()=>{
        dispatch(getUsers());
    },[]);

const users= useSelector((state)=>state.userReducer.allUsers)
console.log(users)
const dispatch= useDispatch();


    return(
        <div className={Style.general}>
            <h1 className= {Style.TitleCategory}>Users</h1>
            {
                        users.length>0?
                        users.map((user)=>{
                        return <div className={Style.Tarjet} key={user.id} >
                                    <p className={Style.Titles}>{user.name}</p>
                                    <p className={Style.Titles}>{user.email}</p>
                                    <div className={Style.Contenedores}>
                        
                                    </div>
                            </div>
                            
                        })
                        :<p>Users not found</p>
                    }
        </div>


    )

}

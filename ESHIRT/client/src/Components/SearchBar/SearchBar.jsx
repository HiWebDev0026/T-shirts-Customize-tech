import React, {useState} from 'react';
import {useHistory} from 'react-router-dom'
import {getShirtsByName} from '../../Actions/index';
import { useDispatch } from 'react-redux';
import Style from './SearchBar.module.css';


function SearchBar(){

    let dispatch = useDispatch()
    const [state, setState]= useState('')
    function handleChange(e) {
        setState(e.target.value)
    }
    const history = useHistory()

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getShirtsByName(state))
        setState('');
        history.push('/catalogue')
    }

    return(
        <div>
            <form onSubmit = {(e)=> handleSubmit(e)}>
                <input className={Style.inputBox} type='text' placeholder= 'Find your next shirt' value ={state} onChange={(e)=>handleChange(e)}/>
             <input className={Style.inputBtn} type='submit' value= 'Search'/>
            </form>
        </div>
    )
}

export default SearchBar;
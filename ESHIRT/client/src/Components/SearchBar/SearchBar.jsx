import React from 'react';
import {useState} from 'react';
import { useDispatch } from 'react-redux';
import Style from './SearchBar.module.css';
import {getShirtsByName} from '../../Actions/Actions';
import {NavLink} from 'react-router-dom';

function SearchBar(){

    const [searched, setSearched] = useState("");
    const dispatch= useDispatch();

    function handleSubmit(e){
        e.preventDefault();
        console.log("Estoy en el handleSubmit");
        dispatch(getShirtsByName(searched)) // acá voy a hacer el dispatch
        setSearched("");
    }

    return(
        <form onSubmit= {(e)=> handleSubmit(e)}>
            <input className={Style.inputBox} type="text" placeholder="Find your next shirt" value={searched} onChange={e => setSearched(e.target.value)}/>
           <NavLink to='/catalogue'><input className={Style.inputBtn} type="submit" value="Buscar" /></NavLink>
          </form>
    );
}


export default SearchBar;
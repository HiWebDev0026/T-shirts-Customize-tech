import React from 'react';
import {useState} from 'react';
import Style from './SearchBar.module.css';

function SearchBar(){

    const [Searched, setSearched] = useState("");

    function handleSubmit(e){
        e.preventDefault();
        // acá voy a hacer el dispatch
        setSearched("");
    }

    return(
        <form onSubmit={handleSubmit}>
            <input className={Style.inputBox} type="text" placeholder="Find your next shirt" value={Searched} onChange={e => setSearched(e.target.value)}/>
            <input className={Style.inputBtn} type="submit" value="Buscar" />
          </form>
    );
}


export default SearchBar;
import React from 'react';
import {useState} from 'react';

function SearchBar(){

    const [Searched, setSearched] = useState("");

    function handleSubmit(e){
        e.preventDefault();
        // acá voy a hacer el dispatch
        setSearched("");
    }

    return(
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Find your next shirt" value={Searched} onChange={e => setSearched(e.target.value)}/>
            <input type="submit" value="Buscar" />
          </form>
    );
}


export default SearchBar;
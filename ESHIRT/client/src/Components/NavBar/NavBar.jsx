import React from 'react';
import Logo from '../../Images/E-Shirt.png'
import SearchBar from '../SearchBar/SearchBar';
import {NavLink} from 'react-router-dom';
import './NavBar.css';

function Navbar() {
  return (
    <header>
        <div class="container">
        <img class="logo" src={Logo} alt="logo"/>

        <nav>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Catalog</a></li>
                <li><a href="#">Login</a></li>
                <li><a href="#">Cart</a></li>
            </ul>
        </nav>

        <SearchBar class="searchBar" />
        </div>
  </header>
    // <div>
    //     <NavLink exact to="/home"><img src={Logo} alt="logo"/></NavLink> 
    //     <div>
    //         <NavLink  exact to="/home">Home</NavLink>
    //         <NavLink to="/">Catalog</NavLink>
    //         <NavLink to="/">Login</NavLink>
    //         <NavLink to="/">Cart</NavLink>
    //     </div>
    //     <SearchBar />
    // </div>
  );
};

export default Navbar;
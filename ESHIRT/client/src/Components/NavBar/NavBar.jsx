import React from 'react';
import Logo from '../../Images/E-Shirt.png'
import SearchBar from '../SearchBar/SearchBar';
import {NavLink} from 'react-router-dom';
import Style from './NavBar.module.css';

function Navbar() {
  return (
    <header className={Style.header}>
        {/* <img className={Style.logo} src={Logo} alt='logo'/> */}
        <span className={Style.logo}>E-Shirt</span>

        <nav>
            <ul className={Style.navLinks}>
                <li><NavLink className={Style.eachLink} exact to='/home'>Home</NavLink></li>
                <li><NavLink className={Style.eachLink} to='/catalogue'>Catalog</NavLink></li>
                <li><NavLink className={Style.eachLink} to='/design'>Design</NavLink></li>
                <li><NavLink className={Style.eachLink} to="/Login">Login</NavLink></li>
                <li><NavLink className={Style.eachLink} to="/">Cart</NavLink></li>
            </ul>
        </nav>

        <SearchBar className={Style.searchBar} />
  </header>
  );
};

export default Navbar;
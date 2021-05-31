import React from 'react';
import { GrCart, GrFavorite } from "react-icons/gr";
import SearchBar from '../SearchBar/SearchBar';
import {NavLink} from 'react-router-dom';
import Style from './NavBar.module.css';
import Login from '../../auth/AuthenticationButton';


function UserNavbar() {
  return (
    <header className={Style.header}>

        <span className={Style.logo}>E-Shirt</span>
        
        <nav>
            <ul className={Style.navLinks}>
                <li><NavLink className={Style.eachLink} exact to='/home'>Home</NavLink></li>
                <li><NavLink className={Style.eachLink} to='/catalogue'>Catalog</NavLink></li>
                <li><NavLink className={Style.eachLink} to='/design'>Design</NavLink></li>
                
                <li><Login className={Style.eachLink}/></li>
            </ul>
        </nav>
        <SearchBar className={Style.searchBar} />
        <NavLink className={Style.eachLink} to='/favorites'>< GrFavorite /></NavLink>
        <NavLink className={Style.eachLink} to='/cart'><GrCart /></NavLink>
  </header>
  );
};

export default UserNavbar;
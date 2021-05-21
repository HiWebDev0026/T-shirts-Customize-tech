import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import {NavLink} from 'react-router-dom';
import { GrCart, GrFavorite } from "react-icons/gr";
import Style from './NavBar.module.css';
import Login from '../../auth/AuthenticationButton';


function GenericNavbar() {

    return (
    <header className={Style.header}>
        <span className={Style.logo}>E-Shirt</span>

        <nav>
            <ul className={Style.navLinks}>
                <li><NavLink className={Style.eachLink} exact to='/home'>Home</NavLink></li>
                <li><NavLink className={Style.eachLink} to='/catalogue'>Catalog</NavLink></li>
                <li><NavLink className={Style.eachLink} to='/design'>Design</NavLink></li>
                <li><NavLink className={Style.eachLink} to='/account'>Account</NavLink></li>
                <li><Login className={Style.eachLink}/></li>
            </ul>
        </nav>

        <div className={Style.search}>
            <SearchBar className={Style.searchBar} />
            <NavLink className={Style.fav} to='/favorites'>< GrFavorite /></NavLink>
            <NavLink className={Style.cart} to='/cart'><GrCart /></NavLink>
        </div>
    </header>
  );
};

export default GenericNavbar;
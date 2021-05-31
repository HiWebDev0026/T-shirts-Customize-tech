import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import {NavLink} from 'react-router-dom';
import { GrCart, GrFavorite } from "react-icons/gr";
import Style from './NavBar.module.css';
import Login from '../../auth/AuthenticationButton';
import {ReactComponent as HomeButton} from '../../assets/25694.svg'
import {ReactComponent as DesignButton} from '../../assets/3456377.svg';
import {ReactComponent as CatalogueIcon} from '../../assets/4357336.svg'
import logoEShirt from '../../assets/img/E - SHIRT.png'
import {useWidthCheck} from '../../hooks/widthCheck';

function GenericNavbar() {

    const width = useWidthCheck();

    return (
    <header className={Style.header}>
        
        <div className={Style.logoContainer}>
            {/* <img src={logoEShirt} /> */}
            LOGO SHIRTS
        </div>

        
        <div className={Style.panelNavBar}>
        
            
            
            {width > 960 ? (<div className={Style.loginPanel}><Login className={Style.loginBtn}/>
            <NavLink className={Style.fav} to='/favorites'>< GrFavorite /></NavLink>
            <NavLink className={Style.cart} to='/cart'><GrCart /></NavLink></div>) : 

            'responsive'

            }
       
        
        <div className={Style.navbarContainer}>
        <SearchBar className={Style.searchBar} />
        {width > 960 && <nav >
            <ul className={Style.navLinks}>
                <li><NavLink className={Style.eachLink}  exact to='/home'><HomeButton className={Style.home} iconified="true" /><span style={{marginLeft: '8px'}}>Home</span></NavLink><div className={Style.underline}></div></li>
                <div className={Style.navSeparator}></div>
                <li><NavLink className={Style.eachLink} to='/catalogue'><CatalogueIcon className={Style.catalogueIcon} iconified="true"/><span style={{marginLeft: '8px'}} >Catalog</span></NavLink><div className={Style.underline}></div></li>
                <div className={Style.navSeparator}></div>
                <li><NavLink className={Style.eachLink} to='/design'><DesignButton className={Style.designIcon} iconified="true"/><span style={{marginLeft: '8px'}}>Design</span></NavLink><div className={Style.underline}></div></li>
                {/* <div className={Style.navSeparator}></div> */}
                {/* <li><NavLink className={Style.eachLink} to='/account'>Account</NavLink><div className={Style.underline}></div></li> */}
                
            </ul>
        </nav>}
        </div>
        </div>
    </header>
  );
};

export default GenericNavbar;
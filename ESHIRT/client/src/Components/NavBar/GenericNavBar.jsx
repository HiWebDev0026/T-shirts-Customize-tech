import React, {useState} from 'react';
import SearchBar from '../SearchBar/SearchBar';
import ResponsiveMenu from './ResponsiveMenu';
import {NavLink} from 'react-router-dom';
import { GrCart, GrFavorite } from "react-icons/gr";
import Style from './NavBar.module.css';
import Login from '../../auth/AuthenticationButton';
import LogoEshirt from '../../assets/logo_1_page.png';
import {ReactComponent as HomeButton} from '../../assets/25694.svg'
import {ReactComponent as DesignButton} from '../../assets/3456377.svg';
import {ReactComponent as CatalogueIcon} from '../../assets/4357336.svg'
import {ReactComponent as HeartFavorite} from '../../assets/2107845.svg'
import {ReactComponent as CartIcon} from '../../assets/879815.svg';
import { SideCart } from "../Cart/SideCart";
import logoEShirt from '../../assets/img/E - SHIRT.png'
import {useWidthCheck} from '../../hooks/widthCheck';



function GenericNavbar() {

    const [cartDeployed, setCartDeployed] = useState(false);
    const width = useWidthCheck();

    return (
    <header className={Style.header}>
        
        <div className={Style.logoContainer}>
            
            <img src={LogoEshirt}/>
            
        </div>

        
        <div className={Style.panelNavBar}>
        
            
            
            {width > 960 ? (<div className={Style.loginPanel}><Login className={Style.loginBtn}/>
                <div className={Style.navSeparator} style={{height: '30px'}}></div>
            <NavLink className={Style.fav} to='/favorites'>< HeartFavorite /></NavLink>
            <div className={Style.cart} onClick={()=> {
                return setCartDeployed(true);
            }}><CartIcon /></div></div>) : 

            <ResponsiveMenu setCartDeployed={setCartDeployed}/>

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
        {cartDeployed && <SideCart closeCart={setCartDeployed}/>}
    </header>
  );
};

export default GenericNavbar;
import React from 'react'
import Style from './NavBar.module.css';
import Login from '../../auth/AuthenticationButton';
import {ReactComponent as CartIcon} from '../../assets/879815.svg'
import {ReactComponent as HeartFavorite} from '../../assets/2107845.svg'
import {ReactComponent as HomeButton} from '../../assets/25694.svg'
import {ReactComponent as DesignButton} from '../../assets/3456377.svg';
import {ReactComponent as CatalogueIcon} from '../../assets/4357336.svg';
import {useHistory} from 'react-router-dom';
import LogoutButton from '../../auth/LogoutButton'
import {NavLink} from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

export default function ResponsiveDeployableMenu({deploy, menuClose, setCartDeployed}) {
    const {isAuthenticated, logout}= useAuth0()
    const history = useHistory();

    return (
        deploy && <div className={Style.menuSection}>
            <div className={Style.topPanelIcons}>
                    <Login className={Style.loginBtn} menuClose={(arg)=>menuClose(arg)}/>
                    <div className={Style.navSeparator} style={{height: '30px'}}></div>
                <div className={Style.cart} onClick={()=> {
                    setCartDeployed(true)
                    return menuClose(false);
                    }} >
                    <CartIcon />
                </div>
                <div className={Style.navSeparator} style={{height: '30px'}}></div>
                <div className={Style.fav} onClick={()=> {
                    return history.push('/favorites')
                }}>
                    <HeartFavorite />
                </div>
            </div>
            <div className={Style.responsiveNavBar}>
                <ul className={Style.navLinks}>
                    <li>
                        <NavLink className={Style.eachLink} onClick={()=>menuClose(false)} exact to='/home'>
                            <HomeButton className={Style.home} iconified="true" />
                            <span style={{marginLeft: '8px'}}>Home</span>
                        </NavLink>
                        <div className={Style.underline}/>
                    </li>
                    <div className={Style.navSeparator}/>
                <li>
                    <NavLink className={Style.eachLink} onClick={()=>menuClose(false)} to='/catalogue'>
                        <CatalogueIcon className={Style.catalogueIcon} iconified="true"/>
                        <span style={{marginLeft: '8px'}} >Catalog</span>
                    </NavLink>
                    <div className={Style.underline}/>
                </li>
                <div className={Style.navSeparator}/>
                <li>
                    <NavLink className={Style.eachLink} onClick={()=>menuClose(false)} to='/design'>
                        <DesignButton className={Style.designIcon} iconified="true"/>
                        <span style={{marginLeft: '8px'}}>Design</span>
                    </NavLink>
                    <div className={Style.underline}/>
                </li>
                <li>
                    <NavLink className={Style.eachLink} to='/home'>
                        <span style={{marginLeft: '8px'}}>
                            {
                                isAuthenticated ? 
                                <span onClick={() => {logout()}}>LOG OUT</span>
                                : 
                                <div></div>
                            }
                        </span>
                    </NavLink>
                    <div className={Style.underline}/>
                </li>  
                </ul>
            </div>
        </div>
    )
}
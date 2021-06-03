import React from 'react'
import Style from './NavBar.module.css';
import Login from '../../auth/AuthenticationButton';
import {ReactComponent as CartIcon} from '../../assets/879815.svg'
import {ReactComponent as HeartFavorite} from '../../assets/2107845.svg'

export default function ResponsiveDeployableMenu({deploy}) {


    return (
        deploy && <div className={Style.menuSection}>
            <div className={Style.topPanelIcons}>
                    <Login className={Style.loginBtn}/>
                    <div className={Style.navSeparator} style={{height: '30px'}}></div>
                <div className={Style.cart}>
                    <CartIcon />
                </div>
                <div className={Style.navSeparator} style={{height: '30px'}}></div>
                <div className={Style.fav}>
                    <HeartFavorite />
                </div>
            </div>
            <div>
                <ul>
                    <li>

                    </li>
                    <li>

                    </li>
                </ul>
            </div>
        </div>
    )
}
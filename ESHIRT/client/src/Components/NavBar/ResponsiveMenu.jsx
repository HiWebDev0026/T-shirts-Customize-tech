import React, { useState } from 'react'
import { setPostStarted } from '../../Actions';
import {ReactComponent as ResponsiveMenuIcon} from '../../assets/1828551.svg';
import ResponsiveDeployableMenu from './ResponsiveDeployableMenu';
import Style from './NavBar.module.css';


export default function ResponsiveMenu () {

    const [deployed, setDeployed] = useState(false);
    return (
        <div className={Style.ClickableContainer} onClick={()=> setDeployed(prevState => !prevState) }>
            {!deployed ? <ResponsiveMenuIcon /> : 'close'}
            <ResponsiveDeployableMenu deploy={deployed} menuClose={setDeployed} />
        </div>
    )
}


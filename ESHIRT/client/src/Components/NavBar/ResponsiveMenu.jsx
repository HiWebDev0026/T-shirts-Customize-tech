import React, { useState } from 'react'
import { setPostStarted } from '../../Actions';
import {ReactComponent as ResponsiveMenuIcon} from '../../assets/1828551.svg';
import ResponsiveDeployableMenu from './ResponsiveDeployableMenu';
import Style from './NavBar.module.css';


export default function ResponsiveMenu ({unauthRedirections, setCartDeployed}) {

    const [deployed, setDeployed] = useState(false);
    return (
        <div className={Style.ClickableContainer} >
            {!deployed ? <ResponsiveMenuIcon onClick={()=> setDeployed(prevState => !prevState)}/> : <div onClick={()=> setDeployed(prevState => !prevState)}>'close'</div>}
            <ResponsiveDeployableMenu deploy={deployed} menuClose={setDeployed} setCartDeployed={setCartDeployed}/>
        </div>
    )
}


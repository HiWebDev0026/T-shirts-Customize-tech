import React, {useState, useEffect} from "react";
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import { useAuth0, User } from "@auth0/auth0-react";
import {Link} from 'react-router-dom';
import Style from './Btn.module.css';
import {setCartItems} from '../Actions/cart.js';
import {ReactComponent as DeployIcon} from '../assets/32195.svg';
import {ReactComponent as UnextendIcon} from '../assets/130906.svg'
import {useTokenDecode} from '../hooks/tokenDecoding';
import { useWidthCheck } from "../hooks/widthCheck";

const LogoutButton = () => {

  const [deployed, setDeployed] = useState(false);
  const isAdmin = useTokenDecode(localStorage.currentToken);
  const { logout, user } = useAuth0();
 /*  const history = useHistory(); */
  const  dispatch= useDispatch();
  const width = useWidthCheck();

  useEffect(()=> {
    
    const closeIt = (e)=> {
      console.log(e.target.id);


      if(e.target.id =='ButtonDeploy' || e.target.name =='userForClick' || e.target.outerHTML.includes('ButtonDeploy')) {
        return setDeployed(prevState => !prevState);
        
      } else {
        return setDeployed(false);
      }
      
      
      
    }
    window.addEventListener('click', closeIt)

    return ()=> window.removeEventListener('click', closeIt)
  }, [])

  const unauthRedirections = [
                        '/users', 
                        '/create_user',
                        '/cart', 
                        '/designs_admin', 
                        '/account', 
                        '/sales', 
                        '/shirts_admin', 
                        '/user_detail/',
                        '/userDash',
                        '/userData',
                        '/userEdit',
                        '/userOrders', 
                        '/add_category', 
                        '/home_admin',
                        '/favorites',
                      ]
  return (
    <div className={Style.userPanel} name="userForClick">
    <button className={Style.logoutBtn} name="userForClick" /* onClick={()=> {
      return !deployed ? setDeployed(true) : setDeployed(false);
    }} */  >
      {user.name}
    
    {width > 960 && <div className={Style.deployArrowContainer} name="ButtonDeploy" /* onClick={()=> {
      return !deployed ? setDeployed(true) : setDeployed(false);
    }} */  >
      {!deployed ? <DeployIcon /> : <UnextendIcon />}
    </div>}
    </button>
    {width > 960 && deployed && !isAdmin && <div className={Style.deployableMenuCommonUser}>
      <ul name="listorti">
        <li onClick={()=> setDeployed(false)}><Link to='/account'>Profile</Link></li>
        <li><Link to='/userData'>Personal data</Link></li>
        {/* <li><Link to=''>Purchases</Link></li> */}
        <li><Link to='/userOrders'>My orders</Link></li>
        <li onClick={() =>{
        
        localStorage.removeItem('currentToken')
        localStorage.removeItem('items')
        dispatch(setCartItems({}, 'clear'))
       logout({
         returnTo: unauthRedirections.includes(window.location.pathname) ? window.location.origin + '/home' : window.location.href,
       })}
     }>LOG OUT</li>
      </ul>
      </div>}
      {
        deployed && isAdmin && <div className={Style.deployableMenuAdmin}>
        <ul>
          <li><Link to='/adminDash'>Profile</Link></li>
          <li><Link to='/users'>User management</Link></li>
          <li><Link to='/desings_admin'>Shirt designs</Link></li>
          <li><Link to='/shirts_admin'>Shirts</Link></li>
          <li><Link to='/recycleBin'>Recycle bin</Link></li>
          <li><Link to='/discounts'>Discounts</Link></li>
          <li onClick={() =>{
          
          localStorage.removeItem('currentToken')
          localStorage.removeItem('items')
          dispatch(setCartItems({}, 'clear'))
         logout({
           returnTo: unauthRedirections.includes(window.location.pathname) ? window.location.origin + '/home' : window.location.href,
         })}
       }>LOGOUT</li>
        </ul>
        </div>
      }
    </div>
  );
};

export default LogoutButton;
import './App.css';
import {Route} from 'react-router-dom';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {postUser} from './Actions/index.js';

import Home from './Components/Home/Home.jsx'
import NavBar from './Components/NavBar/NavBar.jsx';
import Catalogue from './Components/Catalogue/Catalogue.jsx';
import Footer from './Components/Footer/Footer.jsx';
import Design from './Components/Designer/Design.jsx';
import CreateCategory from './Components/Admin/CreateCategory/CreateCategory.jsx';
import Login from './Components/Login/Login';
import CreateUser from './Components/CreateUser/CreateUser';
import RecoveryAccount from './Components/RecoveryAccount/RecoveryAccount';
import Cart from './Components/Cart/Cart.jsx';
import Users from './Components/Admin/Users/Users';
import UserDetail from './Components/Admin/Users/UserDetail';
import ProtectedRoute from './auth/ProtectedRoute';
import Account from './Components/Account/Account';
import HomeAdmin from './Components/Admin/HomeAdmin/HomeAdmin';
import ShirtsAdmin from './Components/Admin/ShirtsAdmin/ShirtsAdmin';
import Sales from './Components/Admin/Sales/Sales';
import DesignsAdmin from './Components/Admin/DesignsAdmin/DesignsAdmin'; 
import { useAuth0} from "@auth0/auth0-react";
import DesignDetail from './Components/Admin/DesignsAdmin/DesignDetail';


function App() {

  const {isAuthenticated, getAccessTokenSilently, user } = useAuth0();
  const dispatch = useDispatch();
  
  useEffect(() => {
    let token;
    (async () => {
      try {

      

        if(isAuthenticated && !localStorage.hasOwnProperty('currentToken') || localStorage.currentToken === "undefined"){
          token = await getAccessTokenSilently({
            audience: `${process.env.REACT_APP_AUTH0_AUDIENCE}`,
          })
          const { name, sub, email } = user;
          
          const userToPost ={
            id: sub.split('|')[1],
            name,
            email
          } 
          dispatch(postUser(userToPost));
          localStorage.setItem('currentToken', token)
        }

        
        

        return console.log(localStorage);
      } catch (e) {
        console.error(e);
      }
    })();


  }, [isAuthenticated, localStorage.currentToken]);


  return (
    <div className= 'App'>
      <Route path= '/' component={NavBar}/>    
      <Route exact path= '/catalogue' component={Catalogue}/>  
      <Route exact path= '/home' component={Home}/>
      <Route exact path= '/design' component={Design}/>
      <Route exact path= '/cart' component={Cart}/> 
      <Route exact path= '/login' component={Login}/>
      <ProtectedRoute exact path= '/create_user'  component={CreateUser}/>
      <ProtectedRoute exact path= '/home_admin'  component={HomeAdmin}/> 
      <ProtectedRoute exact path= '/add_category'  component={CreateCategory}/> 
      <ProtectedRoute path= '/users'  component={Users}/>
      <ProtectedRoute exact path= '/user_detail/:id'  component={UserDetail}/>
      <ProtectedRoute exact path= '/shirts_admin'  component={ShirtsAdmin}/>
      <ProtectedRoute exact path= '/sales'  component={Sales}/>
      <ProtectedRoute exact path= '/desings_admin'  component={DesignsAdmin}/>
      <Route exact path= '/design_detail' component={DesignDetail}/>
      <Route exact path= '/recovery_account' component={RecoveryAccount}/>
      <ProtectedRoute path='/account' component={Account} />
      <Route path= '/' component={Footer}/>
    </div>
  )
}

export default App;

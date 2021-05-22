import './App.css';
import {Route, Switch} from 'react-router-dom';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {postUser} from './Actions/index.js';
import axios from 'axios';
import Home from './Components/Home/Home.jsx'
import MainNavBar from './Components/NavBar/MainNavBar.jsx';
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
import UserEdit from './Components/Dashboard/User/UserEdit';
import ProtectedRoute from './auth/ProtectedRoute';
import Account from './Components/Account/Account';
import HomeAdmin from './Components/Admin/HomeAdmin/HomeAdmin';
import ShirtsAdmin from './Components/Admin/ShirtsAdmin/ShirtsAdmin';
import Sales from './Components/Admin/Sales/Sales';
import OrderDetail from './Components/Admin/Sales/OrderDetail';
import DesignsAdmin from './Components/Admin/DesignsAdmin/DesignsAdmin'; 
import { useAuth0} from "@auth0/auth0-react";
import DesignDetail from './Components/Admin/DesignsAdmin/DesignDetail';
import Landing from './Components/Landing/Landing';

import Favorites from './Components/Favorites/Favorites.jsx'
import AdminDashboard from './Components/Dashboard/Admin/AdminDashboard';
import UserDashboard from './Components/Dashboard/User/UserDashboard';
import UserData from './Components/Dashboard/User/UserData';
import AboutUs from './Components/AboutUs/AboutUs';
import RecycleBin from './Components/Admin/RecycleBin/RecycleBin';

import Payment from './Components/Cart/Payment/Payment'

import Reviews from './Components/Reviews/Reviews.jsx'
import RecycleBinShirt from './Components/Admin/RecycleBin/RecycleBinShirt';
import RecycleBinUser from './Components/Admin/RecycleBin/RecycleBinUser';
import RecycleBinDesigns from './Components/Admin/RecycleBin/RecycleBinDesigns';



function App({location}) {

  const {isAuthenticated, getAccessTokenSilently, user } = useAuth0();
  const dispatch = useDispatch();
  
  useEffect(() => {
    let token;
    (async () => {
      try {

      

        if(isAuthenticated){
          token = await getAccessTokenSilently({
            audience: `${process.env.REACT_APP_AUTH0_AUDIENCE}`,
          })
          const { name, sub, email } = user;
          
          const userToPost ={
            id: sub.split('|')[1],
            name,
            email
          } 

                try {

                    const checkDB = await axios({
                        method: 'GET',
                        url: `/user/${userToPost.id}`,
                        headers: {
                          Authorization: `Bearer ${token}`
                        }
                    })

                    alert(`Welcome Back ${name}`);
                  

              }catch(err) {
                
                  dispatch(postUser(userToPost));
                  alert(`Welcome to our website ${name}`)
                  

              }
              localStorage.setItem('currentToken', token)
          
        }


        return;
      } catch (e) {
        console.error(e);
        alert('Error on login:', e)

      }
    })();

    return ()=> localStorage.removeItem('currentToken')
    

  }, [isAuthenticated, localStorage.currentToken]);


  return (
    <div>
      <Switch >

      <Route exact path= '/' component={Landing}/>
      <div className= 'App' >
      <MainNavBar />  
      {/* <Route path= '/' component={MainNavBar}/>   */}
      <ProtectedRoute path= '/userDash' component={UserDashboard}/> 
      <ProtectedRoute path= '/userData' component={UserData}/> 
      <ProtectedRoute path= '/userEdit' component={UserEdit}/> 
      <Route exact path= '/catalogue' component={Catalogue}/>  
      <Route exact path= '/home' component={Home}/>
      <Route exact path= '/design' component={Design}/>
      <Route exact path= '/cart' component={Cart}/> 
      <Route exact path= '/login' component={Login}/>
      <Route exact path= '/adminDash' component={AdminDashboard}/>
      <Route exact path= '/aboutUs' component={AboutUs}/>
      <ProtectedRoute exact path= '/recycleBin' component={RecycleBin}/>
      <ProtectedRoute exact path= '/recycleBinShirt' component={RecycleBinShirt}/>
      <ProtectedRoute exact path= '/recycleBinUser' component={RecycleBinUser}/>
      <ProtectedRoute exact path= '/recycleBinDesigns' component={RecycleBinDesigns}/>
      <ProtectedRoute exact path= '/create_user'  component={CreateUser}/>
      <ProtectedRoute exact path= '/home_admin'  component={HomeAdmin}/> 
      <ProtectedRoute exact path= '/add_category'  component={CreateCategory}/> 
      <ProtectedRoute path= '/users'  component={Users}/>
      <Route path= '/shirt/:id/review' component={Reviews}/>
      <ProtectedRoute exact path= '/user_detail/:id'  component={UserDetail}/>
      <ProtectedRoute exact path= '/shirts_admin'  component={ShirtsAdmin}/>
      <ProtectedRoute exact path= '/sales'  component={Sales}/>
      <ProtectedRoute exact path= '/order_detail/:id'  component={OrderDetail}/>
      <ProtectedRoute exact path= '/desings_admin'  component={DesignsAdmin}/>
      <ProtectedRoute exact path= '/favorites' component={Favorites}/>
      <ProtectedRoute exact path= '/design_detail' component={DesignDetail}/>
      <Route exact path= '/recovery_account' component={RecoveryAccount}/>
      <ProtectedRoute path='/account' component={Account} />
      <ProtectedRoute path='/payment' component={Payment} />
      <Footer/>
      </div>  

      </Switch>
    </div>
  )
}

export default App;

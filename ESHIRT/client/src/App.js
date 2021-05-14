import './App.css';
import {Route} from 'react-router-dom';

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
import {Profile} from './auth/Profile';
import HomeAdmin from './Components/Admin/HomeAdmin/HomeAdmin';
import ShirtsAdmin from './Components/Admin/ShirtsAdmin/ShirtsAdmin';
import Sales from './Components/Admin/Sales/Sales';
import DesignsAdmin from './Components/Admin/DesignsAdmin/DesignsAdmin';



function App() {
  return (
    <div className= 'App'>
      <Route path= '/' component={NavBar}/>    
      <Route exact path= '/catalogue' component={Catalogue}/>  
      <Route exact path= '/home' component={Home}/>
      <Route exact path= '/design' component={Design}/>
      <Route exact path= '/cart' component={Cart}/> 
      <Route exact path= '/login' component={Login}/>
      <Route exact path= '/create_user' component={CreateUser}/>
      <Route exact path= '/home_admin' component={HomeAdmin}/> 
      <Route exact path= '/add_category' component={CreateCategory}/> 
      <Route exact path= '/users' component={Users}/>
      <Route exact path= '/user_detail/:id' component={UserDetail}/>
      <Route exact path= '/shirts_admin' component={ShirtsAdmin}/>
      <Route exact path= '/sales' component={Sales}/>
      <Route exact path= '/desings_admin' component={DesignsAdmin}/>
      <Route exact path= '/recovery_account' component={RecoveryAccount}/>
      <ProtectedRoute path='/profile' component={Profile} />
      <Route path= '/' component={Footer}/>
    </div>
  )
}

export default App;

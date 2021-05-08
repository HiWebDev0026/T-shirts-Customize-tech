import './App.css';
import Home from './Components/Home/Home.jsx'
import NavBar from './Components/NavBar/NavBar.jsx';
import Catalogue from './Components/Catalogue/Catalogue.jsx';
import Footer from './Components/Footer/Footer.jsx';
import Design from './Components/Designer/Design.jsx';
import {Route} from 'react-router-dom';

function App() {
  return (
    <div className= 'App'>
      <Route path= '/' component={NavBar}/>
      <Route exact path= '/' component={Home}/>
      <Route exact path= '/catalogue' component={Catalogue}/>
      <Route exact path= '/design' component={Design}/>
      <Route path= '/' component={Footer}/>
    </div>
  )
}

export default App;

import './App.css';
import Home from './Components/Home/Home.jsx'
import NavBar from './Components/NavBar/NavBar.jsx';
import Cards from './Components/Catalogue/Cards/Cards.jsx';
import Footer from './Components/Footer/Footer.jsx';
import Design from './Components/Designer/Design.jsx';
import {Route} from 'react-router-dom';

function App() {
  return (
    <div className= 'App'>
      <Route path= '/' component={NavBar}/>
      <Route exact path= '/design' component={Design}/>
      <Route exact path= '/home' component={Home}/>
      <Route exact path= '/catalogue' component={Cards}/>
      <Route path= '/' component={Footer}/>
    </div>
  )
}

export default App;

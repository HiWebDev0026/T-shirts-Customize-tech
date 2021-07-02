import axios from 'axios';
import dotenv from 'dotenv';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Auth0ProviderWithHistory from './auth/Auth0Provider';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from "react-redux";
import store from './Store/store'

dotenv.config();

console.log(process.env.REACT_APP_AUTH0_AUDIENCE)
console.log(process.env.REACT_APP_AUTH0_DOMAIN)
console.log(process.env)



axios.defaults.baseURL = process.env.REACT_APP_API || "api";



ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
    <Auth0ProviderWithHistory>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Auth0ProviderWithHistory>
  </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

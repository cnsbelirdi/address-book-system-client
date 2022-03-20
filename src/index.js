import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import AuthProvider from './contexts/AuthContext';

axios.defaults.baseURL = "https://address-book-system-rest.herokuapp.com/";
// axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.withCredentials = true;

axios.interceptors.request.use(function (config) {
  var jwt = localStorage.getItem('jwt');
  if (jwt) {
    config.headers["Authorization"] = jwt;
  }

  return config;
});

if (module.hot) {
  module.hot.accept();
}

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

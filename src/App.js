import './App.css';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Add from './pages/Add';
import ViewAll from './pages/ViewAll';
import Login from './pages/Auth/Login';
import { useAuth } from './contexts/AuthContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Register from './pages/Auth/Register';


function App() {

  const [auth, setAuth] = useAuth();
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedIn(auth.username != '');
  }, [auth.username]);


  useEffect(async () => {
    let jwt = localStorage.getItem('jwt');

    if (jwt) {
      let result;
      await axios.get('/api/auth/user').then(res => result = res).catch(x => console.log(x));

      if (result) {

        if (result.data.status === "OK") {
          setAuth({
            username: result.data.username,
            role: result.data.role
          });

          console.log(result);
          return;
        }
      }

      console.log('sa')
      setAuth({
        username: '',
        role: ''
      });

      localStorage.removeItem('jwt');

    }
  }, []);

  function handleClick() {
    loggedIn ? navigate('/logout') : navigate('/login');
  }

  return (
    <div class="bg-info-light">
      <div class="container">
        {/* -- HEADER -- */}
        <header class="navbar  justify-content-between">
          <Link to="/"><img class="logo" src="https://uskudar.edu.tr/assets/kurumsal/logo-en/png/uskudar-university-logo.png" /></Link>
          <h5 class="text-light">Uskudar University Address Book</h5>
          <button class="btn btn-info my-2 my-sm-0" onClick={handleClick}>{loggedIn ? "Log out" : "Login"}</button>
        </header>

        {/*  -- NAVBAR -- */}
        <nav class="navbar navbar-expand-lg navbar-dark bg-info">
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                {/* <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a> */}
                <Link class="nav-link" to='/'>Home</Link>
              </li>
              <li class="nav-item">
                {/* <a class="nav-link" href="addUser.html">Add</a> */}
                <Link class="nav-link" to='/add'>Add</Link>
              </li>
              <li class="nav-item">
                {/* <a class="nav-link" href="viewAll.html">View All</a> */}
                <Link class="nav-link" to='/viewAll'>View All</Link>
              </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
              <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
              <button class="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </nav>
        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='/add' element={<Add />} />
          <Route path='/viewAll' element={<ViewAll />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

        </Routes>
      </div>
    </div>
  );
}

export default App;

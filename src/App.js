import './App.css';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Add from './pages/User/Add';
import ViewAll from './pages/ViewAll';
import Login from './pages/Auth/Login';
import { useAuth } from './contexts/AuthContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Register from './pages/Auth/Register';
import ViewUser from './pages/User/ViewUser';
import Edit from './pages/User/Edit';
import Navbar from './components/Navbar';
import Search from './pages/Search';


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

      setAuth({
        username: '',
        role: ''
      });

      localStorage.removeItem('jwt');

    }
  }, []);

  function logout() {
    localStorage.removeItem('jwt');
    setAuth({
      username: '',
      role: ''
    });
    setLoggedIn(false);
    navigate('/login');
  }

  return (
    <div class="bg-info-light">
      <div class="container">
        {/* -- HEADER -- */}
        <header class="navbar  justify-content-between">
          <Link to="/"><img class="logo" src="https://uskudar.edu.tr/assets/kurumsal/logo-en/png/uskudar-university-logo.png" /></Link>
          <h5 class="text-light">Uskudar University Address Book</h5>
          {
            loggedIn && <button class="btn btn-info my-2 my-sm-0" onClick={logout}>Logout</button>

          }
          {
            !loggedIn && <div className='d-flex flex-row'>
              <button class="btn btn-info my-2 my-sm-0" onClick={() => navigate('/login')}>Login</button>
              <button class="btn btn-info my-2 my-sm-0 ml-3" onClick={() => navigate('/register')}>Register</button>
            </div>

          }
        </header>

        {/*  -- NAVBAR -- */}
        <Navbar role={auth.role} />
        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='/add' element={<Add />} />
          <Route path='/viewAll' element={<ViewAll />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/user/:username' element={<ViewUser />} />
          <Route path='/user/edit/:username' element={<Edit />} />
          <Route path='/search/:type/:text' element={<Search />} />
          <Route path='/search' element={<Search />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

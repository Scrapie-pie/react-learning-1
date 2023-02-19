import React, {useState, useMemo, useEffect} from 'react';
import {BrowserRouter, Routes, Route, Link, Navigate} from 'react-router-dom';
import './styles/App.css';

import About from './pages/About';
import Posts from './pages/Posts';
import Navbar from './components/UI/Navbar/Navbar';
//import PostIdPage from './components/pages/PostIdPage';
import AppRouter from './components/AppRouter';
import {AuthContext} from "./context";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if(localStorage.getItem('auth')) {
      setIsAuth(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{
        isAuth,
        setIsAuth
      }}>
      <BrowserRouter>
        <Navbar/>
        <AppRouter/>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;

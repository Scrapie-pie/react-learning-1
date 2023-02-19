import React from 'react';
import {BrowserRouter, Routes, Route, Link, Navigate} from 'react-router-dom';
import {publicRoutes, privateRoutes} from "../router/routes";

import About from '../pages/About';
import Posts from '../pages/Posts';
import PostIdPage from '../pages/PostIdPage';
import {AuthContext} from "../context";

console.log(privateRoutes);
console.log(publicRoutes);

const AppRouter = (props) => {
  const {isAuth, setIsAuth} = React.useContext(AuthContext);
  console.log(isAuth)
  return (
    isAuth
      ? <Routes>
          {privateRoutes.map((route) =>
            <Route
              key={ route.path }
              path={ route.path }
              element={ <route.component/> }
              exact={ route.exact }
            />
          )}
        </Routes>
      : <Routes>
          {publicRoutes.map((route) =>
            <Route
              key={ route.path }
              path={ route.path }
              element={ <route.component/> }
              exact={ route.exact }
            />
          )}
        </Routes>

  )
}

export default AppRouter;

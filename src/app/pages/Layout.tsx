import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Footer from '../shared/layout/Footer';
import Header from '../shared/layout/Header';
import Aside from '../shared/layout/aside';
import Detail from './detail/index';
import Home from './home';

const Layout = () => {
  const routes = [
    { path: '/', element: <Home /> },
    {
      path: '/detail/:postId',
      element: <Detail />,
    },
  ];
  return (
    <>
      <Header />
      <main className="main">
        <div className="container">
          <div className="d-flex main-body">
            <div className="main-content">
              <Routes>
                {routes.length > 0 &&
                  routes.map((route) => {
                    return <Route path={route.path} element={route.element} key={route.path} />;
                  })}
              </Routes>
            </div>
            <div className="main-aside">
              <Aside />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Layout;

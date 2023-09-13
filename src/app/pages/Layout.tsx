import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Footer from '../shared/layout/Footer';
import Header from '../shared/layout/Header';
import Detail from './detail/index';

const Layout = () => {
  const routes = [
    { path: '/', element: <>Home</> },
    {
      path: '/detail/:postId',
      element: <Detail />,
    },
  ];
  return (
    <div>
      <Header />
      <main className="main">
        <Routes>
          {routes.length > 0 &&
            routes.map((route) => {
              return <Route path={route.path} element={route.element} key={route.path} />;
            })}
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

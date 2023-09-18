import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import Footer from '../shared/layout/Footer';
import Header from '../shared/layout/Header';
import Aside from '../shared/layout/aside/container/Aside';
import { RootState } from '../stores/store';
import DetailPost from './detail-post/container/DetailPost';
import Home from './home/container/Home';

const Layout = () => {
  const authCheck = useSelector((state: RootState) => state.auth?.auth);
  const isLogin = !!authCheck?.accessToken;

  const routes = [
    { path: '/', element: <Home /> },
    {
      path: '/detail/:postId',
      element: <DetailPost />,
    },
    {
      path: '*',
      element: <Navigate to="/page-not-found" />,
    },
  ];
  return (
    <>
      <Header isLogin={isLogin} auth={authCheck} />

      <main className="main">
        <div className="container">
          <div className=" main-body">
            <div className="row">
              <div className="col col-9 col-lg-12">
                <div className="main-content">
                  <Routes>
                    {routes.length > 0 &&
                      routes.map((route) => {
                        return <Route path={route.path} element={route.element} key={route.path} />;
                      })}
                  </Routes>
                </div>
              </div>
              <div className="col col-3 col-lg-12">
                <div className="main-aside">
                  <Aside />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Layout;

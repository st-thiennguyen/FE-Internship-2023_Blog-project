import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import Footer from '../shared/layout/Footer';
import Header from '../shared/layout/Header';
import Aside from '../shared/layout/aside/container/Aside';
import { RootState } from '../stores/store';
import DetailPost from './detail-post/container/DetailPost';
import Home from './home/container/Home';

const Layout = () => {
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
      <Header />

      <main className="main">
        <div className="container">
          <div className=" main-body">
            <div className="row">
              <div className="col col-9 col-lg-12">
                <div className="main-content">
                  <Outlet />
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

import { Outlet } from 'react-router-dom';

import Footer from '../shared/layout/Footer';
import Header from '../shared/layout/Header';
import Aside from '../shared/layout/aside/container/Aside';

const Layout = () => {
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

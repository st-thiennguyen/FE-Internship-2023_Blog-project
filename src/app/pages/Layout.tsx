import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Footer from '../shared/layout/Footer';
import Header from '../shared/layout/Header';

const Layout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;

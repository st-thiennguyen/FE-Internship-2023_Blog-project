import { Route, Routes } from 'react-router-dom';

import Layout from './pages/Layout';
import Login from './pages/auth/containers/Login';
import Register from './pages/auth/containers/Register';
import PageNotFound from './pages/not-found/PageNotFound';

function App() {
  const routes = [
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },

    {
      path: '/page-not-found',
      element: <PageNotFound />,
    },
    { path: '/*', element: <Layout /> },
  ];

  return (
    <>
      <Routes>
        {routes.length > 0 &&
          routes.map((route) => {
            return <Route path={route.path} element={route.element} key={route.path} />;
          })}
      </Routes>
    </>
  );
}

export default App;

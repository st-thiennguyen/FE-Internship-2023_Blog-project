import { Route, Routes } from 'react-router-dom';

import Layout from './pages/Layout';
import Login from './pages/auth/login/Login';
import Register from './pages/auth/register/Register';

function App() {
  const routes = [
    { path: '/*', element: <Layout /> },

    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
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

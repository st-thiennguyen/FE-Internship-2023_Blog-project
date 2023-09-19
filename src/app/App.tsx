import { createContext } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { RootState } from './redux/store';
import Layout from './pages/Layout';
import Login from './pages/auth/login/Login';
import Register from './pages/auth/register/Register';
import PageNotFound from './pages/not-found/PageNotFound';
import AddPost from './pages/home/components/add';

export const AuthContext = createContext<any>(undefined);

function App() {
  const auth = useSelector((state: RootState) => state.login.auth);

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

    {
      path: '/page-not-found',
      element: <PageNotFound />,
    },
  ];

  return (
    <AuthContext.Provider value={auth}>
      <Routes>
        {routes.length > 0 &&
          routes.map((route) => {
            return <Route path={route.path} element={route.element} key={route.path} />;
          })}
      </Routes>
      <AddPost></AddPost>
    </AuthContext.Provider>
  );
}

export default App;

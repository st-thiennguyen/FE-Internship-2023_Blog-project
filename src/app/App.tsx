import { Route, Routes } from 'react-router-dom';

import Layout from './pages/Layout';
import Login from './pages/auth/containers/Login';
import Register from './pages/auth/containers/Register';
import PageNotFound from './pages/not-found/PageNotFound';
import WritePost from './pages/write-post/containers/WritePost';

function App() {
  const routes = [
    {
      path: '/page-not-found',
      element: <PageNotFound />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/write',
      element: <WritePost isUpdate={false} />,
    },
    { path: '/*', element: <Layout /> },
    {
      path: '/update/:id',
      element: < WritePost isUpdate={true} />
    }
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

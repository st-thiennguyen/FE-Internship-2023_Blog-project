import { Route, Routes } from 'react-router-dom';

import Layout from './pages/Layout';

function App() {
  const routes = [
    { path: '/*', element: <Layout /> },
    {
      path: '/register',
      element: <>Register</>,
    },
    {
      path: '/login',
      element: <>Login</>,
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

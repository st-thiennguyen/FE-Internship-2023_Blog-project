import { Route, Routes } from 'react-router-dom';

import Register from './pages/auth/register/RegisterPage';

function App() {
  const routes = [
    { path: '/', element: <>Home</> },
    {
      path: '/detail',
      element: <>Detail</>,
    },
    {
      path: '/register',
      element: <Register />,
    },
  ];

  return (
    <>
      <main>
        <Routes>
          {routes.length > 0 &&
            routes.map((route) => {
              return (
                <Route
                  path={route.path}
                  element={route.element}
                  key={route.path}
                />
              );
            })}
        </Routes>
      </main>
    </>
  );
}

export default App;

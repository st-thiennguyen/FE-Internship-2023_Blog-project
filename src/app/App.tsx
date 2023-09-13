import { Route, Routes } from 'react-router-dom';

import Home from './pages/home';
import Register from './pages/auth/register/Register';
import Footer from './shared/layout/Footer';
import Header from './shared/layout/Header';

function App() {
  const routes = [
    { path: '/', element: <Home /> },
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
      <Header />
      <main className="main">
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
      <Footer />
    </>
  );
}

export default App;

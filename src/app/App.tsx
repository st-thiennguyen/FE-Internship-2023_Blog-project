import { Route, Routes } from 'react-router-dom';

function App() {
  const routes = [
    { path: '/', element: <>Home</> },
    {
      path: '/detail',
      element: <>Detail</>,
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

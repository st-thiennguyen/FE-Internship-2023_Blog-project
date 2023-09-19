import { Route, Routes } from 'react-router-dom';

import { appRoutes } from './app.routes';
import Layout from './pages/Layout';
import authRoutes from './pages/auth/auth.routes';
import PrivateRoute from './shared/components/privateRoute';

interface RouteItem {
  name: string;
  path: string;
  component: () => JSX.Element;
  isAuth?: Boolean;
  children?: RouteItem[];
}

function App() {
  return (
    <Routes>
      {authRoutes.map((val) => (
        <Route key={val.name} path={val.path} element={<val.component />} />
      ))}
      <Route path="/" element={<Layout />}>
        {appRoutes.map((val: RouteItem) => (
          <Route key={val.name} path={val.path} element={<val.component />}>
            {val.children &&
              val.children.map((item) => (
                <Route
                  key={item.name}
                  path={item.path}
                  element={
                    item.isAuth ? (
                      <PrivateRoute>
                        <item.component />
                      </PrivateRoute>
                    ) : (
                      <item.component />
                    )
                  }
                />
              ))}
          </Route>
        ))}
      </Route>
    </Routes>
  );
}

export default App;

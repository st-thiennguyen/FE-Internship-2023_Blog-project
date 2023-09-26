import { createContext } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { RootState } from './stores/store';
import { appRoutes } from './app.routes';

import Layout from './pages/Layout';
import PrivateRoute from './shared/common/ProtectedRouter';
import PageNotFound from './pages/not-found/PageNotFound';
import { authRoutes } from './pages/auth/auth.routes';

interface RouteItem {
  path: string;
  component: (props: any) => JSX.Element;
  isProtected?: Boolean;
  children?: RouteItem[];
  props?: Object;
}

export const AuthContext = createContext<any>(undefined);

function App() {
  const auth = useSelector((state: RootState) => state.auth.auth);
  return (
    <AuthContext.Provider value={auth}>
      <Routes>
        {authRoutes.map((val) => (
          <Route key={val.name} path={val.path} element={<val.component />} />
        ))}
        <Route path="/" element={<Layout />}>
          {appRoutes.map((val: RouteItem, index) => (
            <Route key={index} path={val.path} element={<val.component />}>
              {val.children &&
                val.children.map((item, idx) => (
                  <Route
                    key={idx}
                    path={item.path}
                    element={
                      item.isProtected ? (
                        <PrivateRoute>
                          <item.component {...item.props} />
                        </PrivateRoute>
                      ) : (
                        <item.component {...item.props} />
                      )
                    }
                  />
                ))}
            </Route>
          ))}
        </Route>
        <Route path={'*'} element={<PageNotFound />}></Route>
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;

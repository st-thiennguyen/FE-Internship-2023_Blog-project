import { createContext } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { RootState } from './stores/store';
import { RouteItem } from './models/route';
import { appRoutes } from './app.routes';

import Layout from './pages/Layout';
import PrivateRoute from './shared/common/ProtectedRouter';
import PageNotFound from './pages/not-found/PageNotFound';
import { authRoutes } from './pages/auth/auth.routes';
import ToastMessage from './shared/components/toast/ToastMessage';

export const AuthContext = createContext<any>(undefined);

function App() {
  const auth = useSelector((state: RootState) => state.auth);
  return (
    <AuthContext.Provider value={auth}>
      <Routes>
        {authRoutes.map((val,index) => (
          <Route key={index} path={val.path} element={<val.component />} />
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
      <ToastMessage />
    </AuthContext.Provider>
  );
}

export default App;

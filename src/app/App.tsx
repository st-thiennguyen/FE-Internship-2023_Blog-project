import { createContext } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { appRoutes } from './app.routes';
import Layout from './pages/Layout';
import authRoutes from './pages/auth/auth.routes';
import { RootState } from './stores/store';
import PageNotFound from './pages/not-found/PageNotFound';

interface RouteItem {
  name: string;
  path: string;
  component: () => JSX.Element;
  children?: RouteItem[];
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
          {appRoutes.map((val: RouteItem) => (
            <Route key={val.name} path={val.path} element={<val.component />}>
              {val.children &&
                val.children.map((item) => <Route key={item.name} path={item.path} element={<item.component />} />)}
            </Route>
          ))}
        </Route>
        <Route path={"*"} element={<PageNotFound />}></Route>
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;

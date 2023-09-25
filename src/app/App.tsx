import { createContext } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { RootState } from './stores/store';
import { appRoutes } from './app.routes';
import authRoutes from './pages/auth/auth.routes';

import Layout from './pages/Layout';
import PrivateRoute from './shared/components/privateRoute';
import PageNotFound from './pages/not-found/PageNotFound';
import WritePost from './pages/write-post/containers/WritePost';
import { publicRoutes } from './router/public.routes';
import { privateRoutes } from './router/private.routes';

interface RouteItem {
  path: string;
  component: (props: any) => JSX.Element;
  isAuth?: Boolean;
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
          {publicRoutes.map((val: RouteItem, index) => (
            <Route key={index} path={val.path} element={<val.component />}>
              {val.children &&
                val.children.map((item, idx) => (
                  <Route key={idx} path={item.path} element={<item.component {...item.props} />} />
                ))}
            </Route>
          ))}
        </Route>
        <Route path="/" element={<Layout />}>
          {privateRoutes.map((val: RouteItem, index) => (
            <Route
              key={index}
              path={val.path}
              element={
                <PrivateRoute>
                  <val.component />
                </PrivateRoute>
              }
            >
              {val.children &&
                val.children.map((item, idx) => (
                  <Route key={idx} path={item.path} element={<item.component {...item.props} />} />
                ))}
            </Route>
          ))}
        </Route>
        <Route path="/posts/create" element={<WritePost isUpdate={false} />}></Route>
        <Route path="/posts/update/:id" element={<WritePost isUpdate={true} />}></Route>
        <Route path={'*'} element={<PageNotFound />}></Route>
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;

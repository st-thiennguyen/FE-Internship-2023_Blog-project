import { Route, Routes } from 'react-router-dom';

import { appRoutes } from './app.routes';
import Layout from './pages/Layout';
import authRoutes from './pages/auth/auth.routes';

interface RouteItem {
  name: string;
  path: string;
  component: () => JSX.Element;
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
              val.children.map((item) => <Route key={item.name} path={item.path} element={<item.component />} />)}
          </Route>
        ))}
      </Route>
    </Routes>
  );
}

export default App;

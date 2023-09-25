import Login from './containers/Login';
import Register from './containers/Register';

export const authRoutes = [
  {
    name: 'register',
    path: 'register',
    component: Register,
  },
  {
    name: 'login',
    path: 'login',
    component: Login,
  },
];

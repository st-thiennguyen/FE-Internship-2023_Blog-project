import Login from './containers/Login';
import LoginGoogle from './containers/LoginGoogle';
import Register from './containers/Register';

export const authRoutes = [
  {
    path: 'register',
    component: Register,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: '/login-google',
    component: LoginGoogle,
  },
];

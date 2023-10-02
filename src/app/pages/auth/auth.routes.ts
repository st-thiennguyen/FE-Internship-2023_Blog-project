import Login from './containers/Login';
import LoginGoogle from './containers/LoginGoogle';
import Register from './containers/Register';

export const authRoutes = [
  {
    path: 'auth/register',
    component: Register,
  },
  {
    path: 'auth/login',
    component: Login,
  },
  {
    path: 'auth/login-google',
    component: LoginGoogle,
  },
];

import Login from './login/Login';
import Register from './register/Register';

const authRoutes = [
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

export default authRoutes;

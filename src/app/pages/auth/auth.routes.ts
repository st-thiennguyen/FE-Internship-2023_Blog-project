import Login from "./containers/Login";
import Register from "./containers/Register";

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

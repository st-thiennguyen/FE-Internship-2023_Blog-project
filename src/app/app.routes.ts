import Detail from './pages/detail';
import Home from './pages/home';
import PageNotFound from './pages/not-found/PageNotFound';

export const appRoutes = [
  { name: 'home', path: '/', component: Home },
  {
    name: 'detail',
    path: '/detail/:postId',
    component: Detail,
  },
  {
    name: 'page-not-found',
    path: '*',
    component: PageNotFound,
  },
];

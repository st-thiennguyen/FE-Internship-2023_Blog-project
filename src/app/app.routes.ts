import DetailPost from './pages/detail-post/container/DetailPost';
import Home from './pages/home/container/Home';
import PageNotFound from './pages/not-found/PageNotFound';

export const appRoutes = [
  { name: 'home', path: '/', component: Home },
  {
    name: 'detail',
    path: '/detail/:postId',
    component: DetailPost,
  },
  {
    name: 'page-not-found',
    path: '*',
    component: PageNotFound,
  },
];

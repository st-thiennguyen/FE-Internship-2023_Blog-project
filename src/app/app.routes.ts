import DetailPost from './pages/detail-post/container/DetailPost';
import Home from './pages/home/container/Home';

export const appRoutes = [
  { name: 'home', path: '/', component: Home },
  {
    name: 'detail',
    path: '/detail/:postId',
    component: DetailPost,
  }
];

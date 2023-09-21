import DetailPost from './pages/detail-post/container/DetailPost';
import Home from './pages/home/container/Home';
import UpdateProfile from './pages/user/containers/UpdateProfile';

export const appRoutes = [
  { name: 'home', path: '/', component: Home },
  {
    name: 'detail',
    path: '/detail/:postId',
    component: DetailPost,
  },
  {
    name: 'profile',
    path: '/update-profile/:userId',
    component: UpdateProfile,
  },
];

import DetailPostPage from './pages/detail-post/container';
import DetailPost from './pages/detail-post/container/DetailPost';
import Home from './pages/home/container/Home';
import UpdateProfile from './pages/profile/containers/UpdateProfile';
import userProfileRoutes from './pages/user-profile/user.routes';

export const appRoutes = [
  {
    name: 'home',
    path: '',
    component: Home,
  },
  {
    name: 'posts',
    path: '/posts',
    component: DetailPostPage,
    children: [
      {
        name: 'detail',
        path: 'detail/:postId',
        component: DetailPost,
      },
    ],
  },
  ...userProfileRoutes,
];

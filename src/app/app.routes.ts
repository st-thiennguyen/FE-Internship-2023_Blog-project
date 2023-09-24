import DetailPostPage from './pages/detail-post/container';
import DetailPost from './pages/detail-post/container/DetailPost';
import Home from './pages/home/container/Home';
import Posts from './pages/posts/container/Posts';
import PostsRecycleBin from './pages/posts/container/PostsRecycleBin';
import userProfileRoutes from './pages/profile/user.routes';

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
        name: 'posts',
        path: '',
        component: Posts,
      },
      {
        name: 'recyclebin',
        path: 'recyclebin',
        component: PostsRecycleBin,
      },
      {
        name: 'detail',
        path: 'detail/:postId',
        component: DetailPost,
      },
    ],
  },
  ...userProfileRoutes,
];

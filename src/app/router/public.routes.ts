import DetailPostPage from '../pages/detail-post/container';
import DetailPost from '../pages/detail-post/container/DetailPost';
import Home from '../pages/home/container/Home';
import Posts from '../pages/posts/container/Posts';

export const publicRoutes = [
  {
    path: '',
    component: Home,
  },
  {
    path: '/posts',
    component: DetailPostPage,
    children: [
      {
        path: '',
        component: Posts,
      },
      {
        path: ':postId',
        component: DetailPost,
      },
    ],
  },
];

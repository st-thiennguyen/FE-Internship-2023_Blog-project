import DetailPostPage from '../detail-post/container';
import DetailPost from '../detail-post/container/DetailPost';
import WritePost from '../write-post/containers/WritePost';
import PostRecycleBin from './components/PostRecycleBin';
import PostPage from './container';
import Posts from './container/Posts';

export const postsRoutes = [
  {
    path: '/posts',
    component: PostPage,
    children: [
      {
        path: '',
        component: Posts,
      },
      {
        path: ':id',
        component: DetailPost,
      },
      {
        path: 'create',
        component: WritePost,
        isProtected: true,
        props: {
          isUpdate: false,
        },
      },
      {
        path: 'update/:id',
        component: WritePost,
        isProtected: true,
        props: {
          isUpdate: true,
        },
      },
      {
        path: 'recyclebin',
        component: PostRecycleBin,
        isProtected: true,
      },
    ],
  },
];

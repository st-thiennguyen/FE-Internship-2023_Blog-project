import DetailPost from '../detail-post/container/DetailPost';
import PostRecycleBin from './components/PostRecycleBin';
import PostPage from './container';
import CreatePost from '../write-post/containers/CreatePost';
import UpdatePost from '../write-post/containers/UpdatePost';
import Posts from './container/Posts';
import PostDraft from './components/PostDraft';
import Bookmark from './components/Bookmark';

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
        component: CreatePost,
        isProtected: true,
      },
      {
        path: ':id/edit',
        component: UpdatePost,
        isProtected: true,
      },
      {
        path: 'draft',
        component: PostDraft,
        isProtected: true,
      },
      {
        path: 'recyclebin',
        component: PostRecycleBin,
        isProtected: true,
      },
      {
        path: 'bookmark',
        component: Bookmark,
        isProtected: true,
      },
    ],
  },
];

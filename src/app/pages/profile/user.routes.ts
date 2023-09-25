import ProfilePage from './containers/ProfilePage';
import ProfileUpdate from './containers/ProfileUpdate';
import ProfileUser from './containers/ProfileUser';

const userProfileRoutes = [
  {
    path: '/profile',
    component: ProfileUser,
    children: [
      {
        path: '',
        component: ProfilePage,
        isProtected: true,
      },
      {
        path: ':id',
        component: ProfilePage,
        isProtected: true,
      },
      {
        path: 'update',
        component: ProfileUpdate,
        isProtected: true,
      },
    ],
  },
];

export default userProfileRoutes;

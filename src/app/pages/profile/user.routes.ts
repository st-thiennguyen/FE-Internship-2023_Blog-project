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
      },
      {
        path: ':id',
        component: ProfilePage,
      },
      {
        path: 'update',
        component: ProfileUpdate,
      },
    ],
  },
];

export default userProfileRoutes;

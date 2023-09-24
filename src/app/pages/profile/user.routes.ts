import ProfilePage from './containers/ProfilePage';
import ProfileUpdate from './containers/ProfileUpdate';
import ProfileUser from './containers/ProfileUser';

const userProfileRoutes = [
  {
    name: 'profile',
    path: '/profile',
    component: ProfileUser,
    children: [
      {
        name: 'my-profile',
        path: '',
        component: ProfilePage,
        isAuth: true,
      },
      {
        name: 'user-profile',
        path: ':id',
        component: ProfilePage,
        isAuth: true,
      },
      {
        name: 'update-profile',
        path: 'update',
        component: ProfileUpdate,
        isAuth: true,
      },
    ],
  },
];

export default userProfileRoutes;

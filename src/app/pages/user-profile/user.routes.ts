import ProfilePage from './container/ProfilePage';
import UserProfile from './container/UserProfile';

const userProfileRoutes = [
  {
    name: 'profile',
    path: '/profile',
    component: UserProfile,
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
    ],
  },
];

export default userProfileRoutes;

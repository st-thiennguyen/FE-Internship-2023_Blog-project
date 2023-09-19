import MainProfile from './container/MainProfile';
import UserProfile from './container/UserProfile';

const userProfileRoutes = [
  {
    name: 'profile',
    path: '/profile',
    component: UserProfile,
    children: [
      {
        name: 'main-profile',
        path: '',
        component: MainProfile,
        isAuth: true,
      },
      {
        name: 'other-user',
        path: ':id',
        component: MainProfile,
        isAuth: false,
      },
    ],
  },
];

export default userProfileRoutes;

import UpdateProfile from '../profile/containers/UpdateProfile';
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
      {
        name: 'update-profile',
        path: 'update',
        component: UpdateProfile,
        isAuth: true,
      },
    ],
  },
];

export default userProfileRoutes;

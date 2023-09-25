import authRoutes from './pages/auth/auth.routes';
import { homeRoutes } from './pages/home/home.routes';
import { postsRoutes } from './pages/posts/posts.routes';
import userProfileRoutes from './pages/profile/user.routes';

export const appRoutes = [...authRoutes, ...homeRoutes, ...postsRoutes, ...userProfileRoutes];

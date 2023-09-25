import { privateRoutes } from './router/private.routes';
import { publicRoutes } from './router/public.routes';

export const appRoutes = [...publicRoutes, ...privateRoutes];

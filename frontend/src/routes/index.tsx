import { RouteObject } from 'react-router-dom';
import authRoutes from './auth';
import userRoutes from './user';
import adminRoutes from './admin';

const routes: RouteObject[] = [
  ...authRoutes,
  ...adminRoutes,
  ...userRoutes,
];

export default routes;

import { RouteObject } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Profile from '../pages/auth/Profile';
import EditProfile from '../pages/auth/EditProfile';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';
import PrivateRoute from '../components/PrivateRoute';
import NotAuthorized from '../pages/NotAuthorized';
import Home from '../pages/Home';

const authRoutes: RouteObject[] = [
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  {
    path: '/profile',
    element: (
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    ),
  },
  {
    path: '/edit-profile',
    element: (
      <PrivateRoute>
        <EditProfile />
      </PrivateRoute>
    ),
  },
  { path: '/forgot-password', element: <ForgotPassword /> },
  { path: '/reset-password', element: <ResetPassword /> },
  { path: '/not-authorized', element: <NotAuthorized /> },
  { path: '/', element: <Home /> },
];

export default authRoutes;

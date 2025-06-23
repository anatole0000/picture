import { RouteObject } from 'react-router-dom';
import UserExerciseList from '../pages/user/UserExerciseList'
import ExerciseDetail from '../pages/user/ExerciseDetail';
import PrivateRoute from '../components/PrivateRoute';
import ExerciseHistory from '../pages/user/ExerciseHistory';

const userRoutes: RouteObject[] = [
  { path: '/exercises', element: <PrivateRoute><UserExerciseList /></PrivateRoute>},
  { path: '/exercises/:id', element: <PrivateRoute><ExerciseDetail /></PrivateRoute>},
  { path: "/history", element: <PrivateRoute><ExerciseHistory /></PrivateRoute>}
]

export default userRoutes;
import CreateExercise from '../pages/admin/CreateExercise';

import AdminRoute from '../components/AdminRoute';
import AdminExerciseList from '../pages/admin/AdminExerciseList';
import EditExercise from '../pages/admin/EditExercise';
import AdminDashboard from '../pages/admin/AdminDashboard';

const adminRoutes = [
  {
    path: '/admin/create-exercise',
    element: (
      <AdminRoute>
        <CreateExercise />
      </AdminRoute>
    ),
  },
  {
    path: '/admin/exercises',
    element: (
      <AdminRoute>
        <AdminExerciseList />
      </AdminRoute>
    ),
  },
  {
    path: '/admin/exercises/:id/edit',
    element: (
      <AdminRoute>
        <EditExercise />
      </AdminRoute>
    ),
  },
  {
    path: "/admin/dashboard",
    element: (
      <AdminRoute>
        <AdminDashboard />
      </AdminRoute>
    ),
  }
];

export default adminRoutes;

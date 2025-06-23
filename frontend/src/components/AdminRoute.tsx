import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function AdminRoute({ children }: { children: React.ReactElement }) {
  const { user } = useAuth();

  // Chưa đăng nhập
  if (!user) return <Navigate to="/login" replace />;

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== 'admin') return <Navigate to="/not-authorized" replace />;
  return children;

  
}

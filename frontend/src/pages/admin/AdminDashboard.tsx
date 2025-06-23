// src/pages/AdminDashboard.tsx
import AdminStats from '../../components/AdminStats';
import SubmissionsTable from '../../components/SubmissionsTable';
export default function AdminDashboard() {
  return (
    <div>
      <h1>🎛️ Trang quản trị</h1>
      <AdminStats />
      <SubmissionsTable />
    </div>
  );
}

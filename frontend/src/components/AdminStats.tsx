// src/components/AdminStats.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#00C49F', '#FF8042'];

export default function AdminStats() {
  const [stats, setStats] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:4005/stats', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Lỗi khi tải thống kê');
      }
    };

    fetchStats();
  }, []);

  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!stats) return <div>Đang tải...</div>;

  const chartData = [
    { name: 'Đúng', value: stats.correctSubmissions },
    {
      name: 'Sai',
      value: stats.totalSubmissions - stats.correctSubmissions,
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>📊 Thống kê hệ thống</h2>
      <ul>
        <li>👥 Tổng người dùng: {stats.totalUsers}</li>
        <li>🧠 Tổng bài tập: {stats.totalExercises}</li>
        <li>📩 Tổng bài nộp: {stats.totalSubmissions}</li>
      </ul>

      <h3>✅ Tỉ lệ đúng/sai</h3>
      <PieChart width={400} height={250}>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          outerRadius={80}
          label
        >
          {chartData.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

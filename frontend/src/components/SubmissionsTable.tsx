// src/components/SubmissionsTable.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Submission {
  id: string;
  userID: string;
  isCorrect: boolean;
  createdAt: string;
}

export default function SubmissionsTable() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get(
        `http://localhost:4004/submissions?page=${page}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSubmissions(res.data.submissions);
      setTotalPages(res.data.totalPages || 1);
    };
    fetchData();
  }, [page]);

  return (
    <div style={{ marginTop: 30 }}>
      <h3>📄 Danh sách bài nộp</h3>
      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>User</th>
            <th>Trạng thái</th>
            <th>Ngày gửi</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((s) => (
            <tr key={s.id}>
              <td>{s.userID}</td>
              <td style={{ color: s.isCorrect ? 'green' : 'red' }}>
                {s.isCorrect ? 'Đúng' : 'Sai'}
              </td>
              <td>{new Date(s.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div style={{ marginTop: 10 }}>
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
          ⬅ Trước
        </button>
        <span style={{ margin: '0 10px' }}>
          Trang {page} / {totalPages}
        </span>
        <button onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages}>
          Tiếp ➡
        </button>
      </div>
    </div>
  );
}

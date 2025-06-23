import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { admin_api } from '../../api';

interface Exercise {
  id: string;
  title: string;
  difficulty: string;
  score: number;
  tags: string[];
  createdAt: string;
}

export default function AdminExerciseList() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await admin_api.get('/api/admin/exercises', {
        params: { page, limit },
      });

      setExercises(res.data.exercises || []);
      setTotal(res.data.total || 0);
    } catch (err: any) {
      alert('Lỗi khi tải bài tập: ' + (err.response?.data?.message || 'Không xác định'));
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Bạn chắc chắn muốn xoá?')) return;
    try {
      await admin_api.delete(`/api/admin/exercises/${id}`);
      setExercises(prev => prev.filter(ex => ex.id !== id));
      setTotal(prev => prev - 1);
    } catch (err: any) {
      alert('Lỗi xoá: ' + (err.response?.data?.message || 'Không xác định'));
    }
  };

  return (
    <div>
      <h2>Danh sách bài tập (Tổng: {total})</h2>

      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <>
          <ul>
            {exercises.map(ex => (
              <li key={ex.id} style={{ marginBottom: '10px' }}>
                <strong>{ex.title}</strong> - {ex.difficulty} - {ex.score} điểm
                <br />
                Tags: {ex.tags.join(', ')}
                <br />
                <button onClick={() => handleDelete(ex.id)}>🗑️ Xoá</button>{' '}
                <button onClick={() => navigate(`/admin/exercises/${ex.id}/edit`)}>✏️ Sửa</button>
              </li>
            ))}
          </ul>

          <div style={{ marginTop: '20px' }}>
            <button onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1}>
              ← Trang trước
            </button>
            <span style={{ margin: '0 10px' }}>Trang {page} / {Math.ceil(total / limit)}</span>
            <button
              onClick={() => setPage(p => p + 1)}
              disabled={(page * limit) >= total}
            >
              Trang sau →
            </button>
          </div>
        </>
      )}
    </div>
  );
}

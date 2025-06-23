import { useEffect, useState } from 'react';
import { user_api } from '../../api';

export default function ExerciseHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await user_api.get('/logic/history', {
          params: { page, limit },
        });
        setHistory(res.data.history);
      } catch (err) {
        setError('Không thể tải lịch sử. Vui lòng thử lại.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [page]);

  if (loading) return <p>Đang tải lịch sử...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Lịch sử làm bài</h2>

      {history.length === 0 ? (
        <p>Chưa có lịch sử nộp bài nào.</p>
      ) : (
        <table border={1} cellPadding={8} style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th>Bài tập</th>
              <th>Câu trả lời</th>
              <th>Kết quả</th>
              <th>Thời gian</th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry: any) => (
              <tr key={entry.id}>
                <td>{entry.exercise?.title || '---'}</td>
                <td>{entry.selected}</td>
                <td style={{ color: entry.isCorrect ? 'green' : 'red' }}>
                  {entry.isCorrect ? '✅ Đúng' : '❌ Sai'}
                </td>
                <td>{new Date(entry.submittedAt).toLocaleString('vi-VN')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      <div style={{ marginTop: 20 }}>
        <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>←</button>
        <span style={{ margin: '0 10px' }}>Trang {page}</span>
        <button disabled={history.length < limit} onClick={() => setPage(p => p + 1)}>→</button>
      </div>
    </div>
  );
}

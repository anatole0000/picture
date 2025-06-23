import { useEffect, useState } from 'react';
import { user_api } from '../../api';
import { Link } from 'react-router-dom';

export default function UserExerciseList() {
  const [exercises, setExercises] = useState<any[]>([]);
  const [difficulty, setDifficulty] = useState('');
  const [tag, setTag] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const limit = 5;

  useEffect(() => {
    const fetchExercises = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await user_api.get('/logic/exercises', {
          params: { page, limit, difficulty, tag },
        });
        setExercises(res.data.exercises);
        setTotal(res.data.total);
      } catch (err) {
        console.error(err);
        setError('Failed to load exercises.');
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [page, difficulty, tag]);

  return (
    <div style={{
      padding: '30px 20px',
      maxWidth: 800,
      margin: '0 auto',
      background: 'var(--card-bg)',
      borderRadius: 12,
      boxShadow: '0 0 12px rgba(0,0,0,0.05)',
    }}>
      <h2 style={{ marginBottom: 20 }}>🧠 Exercise List</h2>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 20 }}>
        <label>
          Difficulty:
          <select
            value={difficulty}
            onChange={e => setDifficulty(e.target.value)}
            style={{ marginLeft: 8 }}
          >
            <option value="">All</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>

        <label>
          Tag:
          <input
            value={tag}
            onChange={e => setTag(e.target.value)}
            placeholder="e.g., math"
            style={{ marginLeft: 8 }}
          />
        </label>
      </div>

      {/* Error or Loading */}
      {loading && <p>Loading exercises...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Exercise List */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {exercises.map((ex: any) => (
          <li
            key={ex.id}
            style={{
              marginBottom: 16,
              background: '#f2f2f2',
              padding: '10px 15px',
              borderRadius: 6,
            }}
          >
            <Link to={`/exercises/${ex.id}`} style={{ fontWeight: 'bold', color: '#007bff' }}>
              {ex.title}
            </Link>
            {' '}<span style={{ fontSize: '0.9em' }}>({ex.difficulty})</span>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div style={{ marginTop: 30, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12 }}>
        <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>←</button>
        <span>Page {page}</span>
        <button disabled={page * limit >= total} onClick={() => setPage(p => p + 1)}>→</button>
      </div>
    </div>
  );
}

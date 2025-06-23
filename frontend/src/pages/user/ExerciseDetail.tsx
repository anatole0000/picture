import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { user_api } from '../../api';
import ExerciseComments from './ExerciseComments';

export default function ExerciseDetail() {
  const { id } = useParams();
  const [exercise, setExercise] = useState<any>(null);
  const [selected, setSelected] = useState('');
  const [result, setResult] = useState<null | boolean>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await user_api.get(`/logic/exercises/${id}`);
        setExercise(res.data);
      } catch (err) {
        setError('Không thể tải bài tập. Vui lòng thử lại.');
        console.error(err);
      }
    };
    fetch();
  }, [id]);

  const submit = async () => {
    setLoading(true);
    setError('');
    setResult(null);
    setCorrectAnswer(null);

    try {
      const res = await user_api.post('/logic/submit', {
        exerciseId: id,
        selected,
      });
      setResult(res.data.isCorrect);

      if (!res.data.isCorrect && res.data.correctAnswer) {
        setCorrectAnswer(res.data.correctAnswer); // ✅ dùng dữ liệu từ response
      }
    } catch (err) {
      setError('Lỗi khi nộp bài. Vui lòng thử lại.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!exercise) return <p>Đang tải bài...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>{exercise.title}</h2>
      <p>{exercise.question}</p>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {exercise.options.map((opt: string, idx: number) => (
          <li key={idx}>
            <label style={{ display: 'block', marginBottom: 8 }}>
              <input
                type="radio"
                name="option"
                value={opt}
                checked={selected === opt}
                onChange={() => setSelected(opt)}
                disabled={result !== null}
              />{' '}
              {opt}
            </label>
          </li>
        ))}
      </ul>

      <button onClick={submit} disabled={!selected || loading || result !== null} style={{ marginTop: 10 }}>
        {loading ? 'Đang nộp...' : 'Nộp bài'}
      </button>

      {/* Kết quả */}
      {result !== null && (
        <p style={{ marginTop: 10, color: result ? 'green' : 'red' }}>
          {result ? '✅ Chính xác!' : '❌ Sai rồi!'}
        </p>
      )}

      {/* Đáp án đúng nếu làm sai */}
      {result === false && correctAnswer && (
        <p style={{ marginTop: 10, fontStyle: 'italic' }}>
          Đáp án đúng là: <strong>{correctAnswer}</strong>
        </p>
      )}

      {/* Lỗi nếu có */}
      {error && <p style={{ color: 'red', marginTop: 10 }}>{error}</p>}
      
      <ExerciseComments exerciseId={id!} />
    </div>
  );
}

import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../api';
import { useNavigate } from 'react-router-dom';

export default function EditProfile() {
  const { user, token } = useAuth();
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await api.put(
        '/auth/update-profile',
        { name },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage('✅ Update successful!');
      setTimeout(() => navigate('/profile'), 1000);
    } catch (err: any) {
      setMessage(err.response?.data?.message || '❌ Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: '400px',
        margin: '60px auto',
        backgroundColor: '#1f2937',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
        color: '#e5e7eb',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#fff' }}>
        Edit Display Name
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="New name"
          required
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '15px',
            borderRadius: '8px',
            border: '1px solid #374151',
            backgroundColor: '#111827',
            color: '#e5e7eb',
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#3b82f6',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          {loading ? 'Updating...' : 'Save'}
        </button>
      </form>

      {message && (
        <p
          style={{
            marginTop: '15px',
            textAlign: 'center',
            color: message.startsWith('✅') ? '#22c55e' : '#f87171',
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}

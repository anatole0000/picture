import { useState } from 'react';
import { api } from '../../api';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', { email, password });
      login(res.data.token);
      navigate('/profile');
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      background: 'var(--bg-color)',
    }}>
      <form
        onSubmit={handleRegister}
        className="card"
        style={{
          width: 350,
          padding: 30,
          display: 'flex',
          flexDirection: 'column',
          gap: 15,
        }}
      >
        <h2 style={{ textAlign: 'center' }}>Create Account</h2>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Register</button>

        <div style={{ textAlign: 'center', fontSize: '0.9rem' }}>
          Already have an account? <Link to="/login">Log in</Link>
        </div>

        {message && <p style={{ color: 'red', textAlign: 'center' }}>{message}</p>}
      </form>
    </div>
  );
}

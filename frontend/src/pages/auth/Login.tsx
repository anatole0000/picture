import { useState } from 'react';
import { api } from '../../api';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // 👁️ icons

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // 👁️ state
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState('');

  const from = (location.state as any)?.from?.pathname || '/profile';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      login(res.data.token);
      navigate(from, { replace: true });
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Login error');
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
        onSubmit={handleLogin}
        className="card"
        style={{
          width: 350,
          padding: 30,
          display: 'flex',
          flexDirection: 'column',
          gap: 15,
        }}
      >
        <h2 style={{ textAlign: 'center' }}>Sign In</h2>

        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          required
        />

        <div style={{ position: 'relative' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            required
            style={{ width: '100%', paddingRight: 30 }}
          />
          <span
            onClick={() => setShowPassword(prev => !prev)}
            style={{
              position: 'absolute',
              right: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
              color: '#888'
            }}
          >
            {showPassword
              ? FaEyeSlash({ size: 18 })
              : FaEye({ size: 18 })}
          </span>
        </div>

        <button type="submit">Sign In</button>

        <div style={{ textAlign: 'center', fontSize: '0.9rem' }}>
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
        <div style={{ textAlign: 'center', fontSize: '0.9rem' }}>
          Don’t have an account? <Link to="/register">Sign up</Link>
        </div>

        {message && <p style={{ color: 'red', textAlign: 'center' }}>{message}</p>}
      </form>
    </div>
  );
}

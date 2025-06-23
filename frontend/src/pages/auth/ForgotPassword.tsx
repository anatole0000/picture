import { useState } from 'react';
import { api } from '../../api';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/forgot-password', { email });
      setMessage(res.data.message);
    } catch (err: any) {
      console.error(err);
      setMessage('An error occurred. Please try again.');
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
        onSubmit={handleSubmit}
        className="card"
        style={{
          width: 350,
          padding: 30,
          display: 'flex',
          flexDirection: 'column',
          gap: 15,
        }}
      >
        <h2 style={{ textAlign: 'center' }}>Forgot Password</h2>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <button type="submit">Send Reset Link</button>
        {message && <p style={{ color: 'green', textAlign: 'center' }}>{message}</p>}
      </form>
    </div>
  );
}

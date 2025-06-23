import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../../api'

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const [newPassword, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/reset-password', { token, newPassword });
      setMessage(res.data.message);
    } catch (err: any) {
      console.error('Reset password error:', err);
      setMessage('Lỗi reset mật khẩu.');
    }
  };

  return (
    <form onSubmit={handleReset}>
      <h2>Đặt lại mật khẩu</h2>
      <input type="password" value={newPassword} onChange={e => setPassword(e.target.value)} placeholder="Mật khẩu mới" required />
      <button type="submit">Đặt lại</button>
      {message && <p>{message}</p>}
    </form>
  );
}

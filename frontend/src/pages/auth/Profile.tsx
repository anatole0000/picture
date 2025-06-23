import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Profile() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px', color: '#888' }}>
        <p>You are not logged in.</p>
        <Link to="/login" style={{ color: '#3b82f6' }}>Go to Login</Link>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: '500px',
      margin: '60px auto',
      backgroundColor: '#1f2937',
      padding: '30px',
      borderRadius: '12px',
      boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
      color: '#e5e7eb',
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#fff' }}>Your Profile</h2>

      <div style={{ marginBottom: '15px' }}>
        <strong>Email:</strong>
        <p style={{ margin: '5px 0 0 0' }}>{user.email}</p>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <strong>Name:</strong>
        <p style={{ margin: '5px 0' }}>
          {user.name}{' '}
          <Link
            to="/edit-profile"
            style={{
              fontSize: '0.9em',
              color: '#60a5fa',
              textDecoration: 'underline',
              marginLeft: '10px',
            }}
          >
            Edit
          </Link>
        </p>
      </div>

      <button
        onClick={logout}
        style={{
          marginTop: '20px',
          width: '100%',
          padding: '10px',
          backgroundColor: '#ef4444',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        Logout
      </button>
    </div>
  );
}

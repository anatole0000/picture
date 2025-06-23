import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect, useRef } from 'react';
//import { RiLoginBoxLine } from 'react-icons/ri';

export default function Header() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const avatarRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const firstChar = user?.email?.charAt(0).toUpperCase();
  

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        avatarRef.current &&
        !avatarRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  return (
    <nav
      style={{
        padding: '12px 24px',
        borderBottom: '1px solid #ccc',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#111827',
        color: '#fff',
      }}
    >
      <Link
        to="/"
        style={{
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
          color: 'inherit',
        }}
      >
        <img
          src="/big-six.jpg"
          alt="Logic Lab Logo"
          style={{ height: 36, marginRight: 12, borderRadius: '6px' }}
        />
        <span style={{ fontWeight: 700, fontSize: '1.3rem' }}>LogicLab</span>
      </Link>

      {user ? (
        <div style={{ position: 'relative' }}>
          <div
            ref={avatarRef}
            onClick={toggleMenu}
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              backgroundColor: '#3b82f6',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: menuOpen ? '0 0 0 3px rgba(59,130,246,0.5)' : 'none',
              transition: 'box-shadow 0.2s ease',
            }}
          >
            {firstChar}
          </div>

          {menuOpen && (
            <div
              ref={menuRef}
              style={{
                position: 'absolute',
                top: '110%',
                right: 0,
                backgroundColor: '#fff',
                color: '#111827',
                border: '1px solid #ccc',
                borderRadius: 8,
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                minWidth: 220,
                padding: '12px 16px',
                zIndex: 1000,
              }}
            >
              <p style={{ fontWeight: 'bold', marginBottom: 4 }}>{user.name}</p>
              <p style={{ fontSize: '0.85rem', color: '#555', marginBottom: 12 }}>{user.email}</p>
              <hr style={{ margin: '8px 0' }} />

              {user.role === 'admin' ? (
                <>
                  <Link to="/admin/create-exercise">➕ Tạo câu hỏi</Link><br />
                  <Link to="/admin/exercises">📋 Quản lý câu hỏi</Link><br />
                  <Link to="/admin/dashboard">📊 Dashboard</Link><br />
                </>
              ) : (
                <Link to="/history">📜 Lịch sử làm bài</Link>
              )}

              <br />
              <Link to="/profile">👤 Trang cá nhân</Link><br />
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                style={{
                  marginTop: 10,
                  padding: '6px 12px',
                  backgroundColor: '#ef4444',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 6,
                  cursor: 'pointer',
                  width: '100%',
                }}
              >
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link to="/login" title="Đăng nhập">
          <button style={{ color: '#3b82f6', fontWeight: 'bold' }}>Đăng nhập</button>
        </Link>
      )}
    </nav>
  );
}

// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer style={{
      marginTop: '60px',
      padding: '40px 20px',
      backgroundColor: '#111827',
      color: '#d1d5db',
      borderTop: '1px solid #374151',
    }}>
      <div style={{
        maxWidth: 1000,
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: '20px',
      }}>
        <div style={{ flex: '1 1 300px' }}>
          <h3 style={{ marginBottom: '12px', color: '#fff' }}>FAQs</h3>
          <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.95rem' }}>
            <li style={{ marginBottom: '10px' }}>
              <strong>Who can use this platform?</strong><br />
              Students, teachers, employers, or anyone wanting to boost logical thinking.
            </li>
            <li style={{ marginBottom: '10px' }}>
              <strong>How many questions can I create?</strong><br />
              No limit if you’re logged in with admin access.
            </li>
            <li style={{ marginBottom: '10px' }}>
              <strong>Is grading supported?</strong><br />
              Yes — you can assign points, and the system supports automatic scoring.
            </li>
          </ul>
        </div>

        <div style={{ flex: '1 1 200px' }}>
          <h3 style={{ marginBottom: '12px', color: '#fff' }}>Contact</h3>
          <p>Email: <a href="mailto:support@logicplatform.com" style={{ color: '#3b82f6' }}>support@logicplatform.com</a></p>
          <p>Hotline: <span style={{ color: '#9ca3af' }}>0123-456-789</span></p>
        </div>
      </div>

      <p style={{
        textAlign: 'center',
        marginTop: '30px',
        fontSize: '0.85rem',
        color: '#6b7280',
      }}>
        &copy; {new Date().getFullYear()} Logic Platform. All rights reserved.
      </p>
    </footer>
  );
}

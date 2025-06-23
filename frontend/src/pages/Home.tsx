import { Link } from 'react-router-dom';
import Footer from './Footer';
import { useAuth } from '../context/AuthContext';
import { Helmet } from 'react-helmet';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from 'react-share';

export default function Home() {
  const { user } = useAuth();
  const shareUrl = 'http://localhost:3000';

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Logic Lab | Sharpen Your Logical Thinking</title>
        <meta
          name="description"
          content="A platform to practice and manage logic questions — ideal for students, teachers, and recruiters to enhance logical thinking skills."
        />
        <meta
          name="keywords"
          content="logic, reasoning, test, practice, assessment, thinking, problem solving"
        />

        {/* Facebook Open Graph */}
        <meta property="og:title" content="Logic Lab | Sharpen Your Logical Thinking" />
        <meta property="og:description" content="Practice and create logical reasoning questions easily." />
        <meta property="og:image" content="https://images.pexels.com/photos/1097930/pexels-photo-1097930.jpeg" />
        <meta property="og:url" content={shareUrl} />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Logic Lab | Sharpen Your Logical Thinking" />
        <meta name="twitter:description" content="Boost your reasoning skills with Logic Lab!" />
        <meta name="twitter:image" content="https://images.pexels.com/photos/1097930/pexels-photo-1097930.jpeg" />
      </Helmet>

      {/* Main Content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '40px',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ flex: '1 1 400px', maxWidth: 600, paddingRight: '20px' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>
            Sharpen Your Logical Thinking with Us
          </h1>
          <p style={{ fontSize: '1.1rem', marginBottom: '15px' }}>
            A logic and reasoning test platform — where you can create, practice, and manage logic questions easily and efficiently.
          </p>
          <p style={{ fontSize: '1.1rem', marginBottom: '25px' }}>
            Perfect for students, teachers, and recruiters who want to assess or enhance logical reasoning skills!
          </p>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '12px' }}>
            {user?.role === 'admin' ? (
              <Link to="/admin/exercises">
                <button
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 6,
                    fontSize: '1rem',
                    cursor: 'pointer',
                  }}
                >
                  Admin Panel
                </button>
              </Link>
            ) : (
              <Link to="/exercises">
                <button
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#28a745',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 6,
                    fontSize: '1rem',
                    cursor: 'pointer',
                  }}
                >
                  Practice Now
                </button>
              </Link>
            )}
          </div>

          {/* Social Share */}
          <div style={{ marginTop: 30 }}>
            <h4> Share this page:</h4>
            <div style={{ display: 'flex', gap: '10px' }}>
              <FacebookShareButton url={shareUrl}>
                <FacebookIcon size={32} round />
              </FacebookShareButton>

              <TwitterShareButton url={shareUrl} title="Sharpen your logic with Logic Lab">
                <TwitterIcon size={32} round />
              </TwitterShareButton>

              <LinkedinShareButton url={shareUrl} title="Logic Lab" summary="Test & practice logical reasoning">
                <LinkedinIcon size={32} round />
              </LinkedinShareButton>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div style={{ flex: '1 1 300px', textAlign: 'center' }}>
          <img
            src="https://images.pexels.com/photos/1097930/pexels-photo-1097930.jpeg"
            alt="A person thinking logically with deep focus"
            style={{ maxWidth: '100%', borderRadius: '12px' }}
          />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}

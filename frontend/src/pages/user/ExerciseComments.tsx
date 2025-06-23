import { useEffect, useState } from 'react';
// ❌ import axios from 'axios';
import { comment_api } from '../../api'; // ✅ Dùng axios instance đã config
import { useAuth } from '../../context/AuthContext';

interface Comment {
  id: string;
  content: string;
  parentId: string | null;
  user: { name: string; email: string };
  replies: Comment[];
}

export default function ExerciseComments({ exerciseId }: { exerciseId: string }) {
  useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await comment_api.get(`/comments/${exerciseId}`); // ✅ Đúng baseURL
        setComments(res.data.comments);
      } catch (err) {
        console.error('❌ Lỗi khi lấy comment:', err);
      }
    };
    fetchComments();
  }, [exerciseId]);

  const handleSubmit = async () => {
    if (!content.trim()) return;

    try {
      await comment_api.post(`/comments`, {
        exerciseId,
        content,
        parentId: replyTo || null,
      });

      setContent('');
      setContent('');
      setReplyTo(null);
      // Refetch comments after submitting
      const fetchComments = async () => {
        try {
          const res = await comment_api.get(`/comments/${exerciseId}`);
          setComments(res.data.comments);
        } catch (err) {
          console.error('❌ Lỗi khi lấy comment:', err);
        }
      };
      fetchComments();
    } catch (err) {
      console.error('❌ Lỗi khi gửi comment:', err);
    }
  };
  return (
    <div style={{ marginTop: 40 }}>
      <h3>Bình luận</h3>

      {/* Form bình luận */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
        placeholder={replyTo ? 'Phản hồi...' : 'Viết bình luận...'}
        style={{ width: '100%', marginBottom: 10 }}
      />
      <br />
      <button onClick={handleSubmit}>
        {replyTo ? 'Gửi phản hồi' : 'Gửi bình luận'}
      </button>
      {replyTo && (
        <button onClick={() => setReplyTo(null)} style={{ marginLeft: 10 }}>
          Hủy
        </button>
      )}

      {/* Danh sách bình luận */}
      <ul style={{ marginTop: 20 }}>
        {comments.map((c) => (
          <li key={c.id} style={{ marginBottom: 20 }}>
            <strong>{c.user?.name || c.user?.email}:</strong> {c.content}
            <br />
            <button onClick={() => setReplyTo(c.id)}>Phản hồi</button>

            {/* Hiển thị replies */}
            <ul style={{ paddingLeft: 20 }}>
              {c.replies.map((r) => (
                <li key={r.id}>
                  <strong>{r.user?.name || r.user?.email}:</strong> {r.content}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

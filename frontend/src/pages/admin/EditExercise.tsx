// src/pages/admin/EditExercise.tsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { admin_api } from '../../api';

export default function EditExercise() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    question: '',
    options: '',
    answer: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await admin_api.get(`/api/admin/exercises/${id}`);
        const ex = res.data;
        setForm({
          title: ex.title,
          question: ex.question,
          options: ex.options.join(', '),
          answer: ex.answer,
        });
      } catch (err: any) {
        alert('Lỗi tải dữ liệu: ' + (err.response?.data?.message || 'Không xác định'));
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await admin_api.put(`/api/admin/exercises/${id}`, {
        ...form,
        options: form.options.split(',').map(o => o.trim()),
      });
      alert('Cập nhật thành công!');
      navigate('/admin/exercises');
    } catch (err: any) {
      alert('Lỗi cập nhật: ' + (err.response?.data?.message || 'Không xác định'));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cập nhật bài tập</h2>
      <input name="title" placeholder="Tiêu đề" value={form.title} onChange={handleChange} required />
      <textarea name="question" placeholder="Câu hỏi" value={form.question} onChange={handleChange} required />
      <input name="options" placeholder="Lựa chọn (cách nhau bởi dấu phẩy)" value={form.options} onChange={handleChange} required />
      <input name="answer" placeholder="Đáp án đúng" value={form.answer} onChange={handleChange} required />
      <button type="submit">Lưu</button>
    </form>
  );
}

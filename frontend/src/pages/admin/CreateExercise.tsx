import { useState } from 'react';
import { admin_api } from '../../api';

export default function CreateExercise() {
  const [form, setForm] = useState({
    title: '',
    question: '',
    options: '',
    answer: '',
    score: 0,
    difficulty: '',
    tags: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await admin_api.post('/api/admin/exercises', {
        ...form,
        options: form.options.split(',').map(o => o.trim()),
        tags: form.tags.split(',').map(t => t.trim()),
      });

      alert('Tạo câu hỏi thành công!');
      console.log(res.data);
    } catch (err: any) {
      alert('Lỗi: ' + err.response?.data?.message || 'Lỗi không xác định');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Tạo câu hỏi logic</h2>
      <input name="title" placeholder="Tiêu đề" onChange={handleChange} required />
      <textarea name="question" placeholder="Câu hỏi" onChange={handleChange} required />
      <input name="options" placeholder="Lựa chọn (cách nhau bởi dấu phẩy)" onChange={handleChange} required />
      <input name="answer" placeholder="Đáp án đúng" onChange={handleChange} required />
      <input name="score" type="number" placeholder="Điểm" onChange={handleChange} required />
      <input name="difficulty" placeholder="Mức độ (VD: dễ, trung bình...)" onChange={handleChange} required />
      <input name="tags" placeholder="Tags (VD: logic, math...)" onChange={handleChange} required />
      <button type="submit">Tạo</button>
    </form>
  );
}

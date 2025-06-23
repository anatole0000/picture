// controllers/exerciseController.ts

import axios from 'axios';
import { Request, Response } from 'express';

export const commentOnExercise = async (req: Request, res: Response) => {
  const { id: exerciseId } = req.params;
  const { content, parentId } = req.body;

  if (!content?.trim()) {
    res.status(400).json({ message: 'Nội dung không được để trống' });
    return;
  }

  try {
    const response = await axios.post(
      'http://localhost:4007/comments',
      {
        exerciseId,
        content,
        parentId: parentId || null,
      },
      {
        headers: {
          Authorization: req.headers.authorization, // ✅ gửi token đi
        },
      }
    );
    console.log('🔐 Forwarding token:', req.headers.authorization);

    res.status(201).json(response.data);
  } catch (err: any) {
    console.error('❌ Lỗi gửi comment:', err.message);
    res.status(500).json({
      message: 'Gửi bình luận thất bại',
      error: err.message || err,
    });
  }
};

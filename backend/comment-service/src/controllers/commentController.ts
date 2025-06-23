import { Request, Response } from 'express';
import { prisma } from '../prisma/client';
import axios from 'axios';
import { CreateCommentSchema } from '../schemas/comment.schema';

// Lấy tất cả comment cho 1 bài tập
const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:4001';


export const getCommentsByExercise = async (req: Request, res: Response) => {
  const { exerciseId } = req.params;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  try {
    // 1. Lấy tổng số comment cha (parentId = null)
    const total = await prisma.comment.count({
      where: { exerciseId, parentId: null },
    });

    // 2. Lấy comment cha kèm replies
    const comments = await prisma.comment.findMany({
      where: {
        exerciseId,
        parentId: null,
      },
      skip,
      take: limit,
      include: {
        replies: {
          orderBy: { createdAt: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // 3. Lấy tất cả userId
    const allUserIds = [
      ...new Set([
        ...comments.map(c => c.userId),
        ...comments.flatMap(c => c.replies.map(r => r.userId)),
      ]),
    ];

    // 4. Gọi user-service để lấy thông tin user
    const userResponse = await axios.post(`${USER_SERVICE_URL}/users/bulk`, {
      ids: allUserIds,
    });

    const users: Record<string, { id: string; name: string; email: string }> = {};
    userResponse.data.forEach((u: any) => {
      users[u.id] = u;
    });

    // 5. Gắn thông tin user vào từng comment và reply
    const commentsWithUser = comments.map(comment => ({
      ...comment,
      user: users[comment.userId],
      replies: comment.replies.map(reply => ({
        ...reply,
        user: users[reply.userId],
      })),
    }));

    res.json({
      total,
      totalPages: Math.ceil(total / limit),
      page,
      limit,
      comments: commentsWithUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi lấy comment', error: err });
  }
};



// Thêm comment mới
export const createComment = async (req: Request, res: Response) => {
  const parsed = CreateCommentSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      message: 'Dữ liệu không hợp lệ',
      errors: parsed.error.flatten(),
    });
    return;
  }

  const { exerciseId, content, parentId } = parsed.data;
  const userId = (req as any).user?.id;

  if (!userId) {
    res.status(401).json({ message: 'Không xác định được người dùng.' });
    return;
  }

  try {
    const newComment = await prisma.comment.create({
      data: {
        userId,
        exerciseId,
        content,
        parentId: parentId || null,
      },
    });

    res.status(201).json(newComment);
  } catch (err) {
    console.error('❌ Lỗi tạo comment:', err);
    res.status(500).json({ message: 'Lỗi tạo comment', error: err });
  }
};


import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getProgress = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const data = await prisma.progress.findMany({ where: { userId } });
  res.json(data);
};

export const updateProgress = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { exerciseId, status } = req.body;
  console.log('[UPDATE]', { userId: user.id, exerciseId, status });

  const existing = await prisma.progress.findFirst({
    where: { userId: user.id, exerciseId },
  });

  if (existing) {
    const updated = await prisma.progress.update({
      where: { id: existing.id },
      data: { status },
    });
    res.json(updated);
    return;
  }

  const created = await prisma.progress.create({
    data: { userId: user.id, exerciseId, status },
  });

  res.json(created);
};

// 🆕 Lấy toàn bộ progress của user hiện tại
export const getMyProgress = async (req: Request, res: Response) => {
  const user = (req as any).user;
  console.log('[ME USER]', user); // 👈
  const data = await prisma.progress.findMany({
    where: { userId: user.id },
  });
  res.json(data);
};

// 🆕 Lấy progress 1 bài cụ thể
export const getOneProgress = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const exerciseId = req.params.exerciseId;

  const data = await prisma.progress.findFirst({
    where: { userId: user.id, exerciseId },
  });

  if (!data) {
    res.status(404).json({ message: 'Không tìm thấy progress cho bài này' });
    return;
  }

  res.json(data);
};

// 🆕 Xoá progress 1 bài
export const deleteProgress = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const exerciseId = req.params.exerciseId;

  const existing = await prisma.progress.findFirst({
    where: { userId: user.id, exerciseId },
  });

  if (!existing) {
    res.status(404).json({ message: 'Progress không tồn tại' });
    return;
  }

  await prisma.progress.delete({
    where: { id: existing.id },
  });

  res.json({ message: 'Đã xoá progress thành công' });
};

// 🆕 Leaderboard: top user theo số bài hoàn thành
export const getLeaderboard = async (_req: Request, res: Response) => {
  const data = await prisma.progress.groupBy({
    by: ['userId'],
    _count: { id: true },
    orderBy: {
      _count: {
        id: 'desc',
      },
    },
    take: 10,
  });

  res.json(data);
};

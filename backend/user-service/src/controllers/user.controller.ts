import { Request, Response } from 'express';
import { prisma } from '../prisma/client'; // hoặc tương đương

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, createdAt: true }, // chỉ expose cần thiết
  });
  res.json(users);
};

export const getUsersBulk = async (req: Request, res: Response) => {
  const { ids } = req.body;

  if (!Array.isArray(ids)) {
    res.status(400).json({ message: 'ids phải là mảng' });
    return;
  }

  const users = await prisma.user.findMany({
    where: {
      id: { in: ids },
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  res.json(users);
};
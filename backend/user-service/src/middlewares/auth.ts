import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { prisma } from '../prisma/client';

dotenv.config();

const SECRET = process.env.JWT_SECRET || 'default_secret';

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Không có token.' });
    return;
  }

  try {
    const payload = jwt.verify(token, SECRET) as { userId: string };

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user) {
      res.status(401).json({ message: 'Người dùng không tồn tại.' });
      return;
    }

    (req as any).user = user;
    next();
  } catch (err) {
    console.error('Token error:', err);
    res.status(401).json({ message: 'Token không hợp lệ.' });
    return;
  }
};

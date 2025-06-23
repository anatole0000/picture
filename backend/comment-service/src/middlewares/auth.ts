import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const SECRET = process.env.JWT_SECRET || 'default_secret';
const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:4001';

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
    const _payload = jwt.verify(token, SECRET) as { userId: string };

    // 👇 Gọi tới user-service để lấy thông tin người dùng (kèm role)
    const response = await axios.get(`${USER_SERVICE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const user = response.data;
    (req as any).user = user;
    next();
  } catch (err) {
    console.error('Auth error:', err);
    res.status(401).json({ message: 'Token không hợp lệ hoặc user không tồn tại.' });
    return;
  }
};

import { Request, Response, NextFunction } from 'express';

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user;

  if (!user || user.role !== 'admin') {
    res.status(403).json({ message: 'Bạn không có quyền truy cập.' });
    return;
  }

  next();
};

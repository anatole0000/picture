// middlewares/cache.ts
import { Request, Response, NextFunction } from 'express';
import { redis } from '../utils/redis';

export const cache = (keyGenerator: (req: Request) => string, ttl = 60) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const key = keyGenerator(req);
    const cached = await redis.get(key);

    if (cached) {
      res.json(JSON.parse(cached));
      return;
    }

    // Hook vào res.json để cache sau khi gửi
    const originalJson = res.json.bind(res);
    res.json = (data: any) => {
      redis.setEx(key, ttl, JSON.stringify(data));
      return originalJson(data);
    };

    next();
  };

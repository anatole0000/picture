import { RateLimiterMemory } from 'rate-limiter-flexible';
import { Request, Response, NextFunction } from 'express';

export function createRateLimiter(points: number, duration: number) {
  const limiter = new RateLimiterMemory({ points, duration });

  return async (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.connection.remoteAddress || 'unknown'; // fix here

    try {
      await limiter.consume(ip);
      next();
    } catch {
      res.status(429).json({ message: 'Bạn thao tác quá nhanh. Vui lòng thử lại sau.' });
    }
  };
}

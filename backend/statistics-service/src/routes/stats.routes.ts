import express from 'express';
import { getStatistics } from '../controllers/stats.controller';
import { authenticate } from '../middlewares/auth'; // nếu có auth
import rateLimit from 'express-rate-limit';
import { isAdmin } from '../middlewares/isAdmin';

const statsLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { message: 'Too many requests, please try again later.' }
});

const router = express.Router();

router.get('/', authenticate, isAdmin, statsLimiter, getStatistics); // GET /stats/

router.get('/health', (_req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

export default router;

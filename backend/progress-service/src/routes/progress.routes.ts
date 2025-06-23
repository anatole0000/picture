import express from 'express';
import { authenticate } from '../middlewares/auth';
import {
  getProgress,
  updateProgress,
  getMyProgress,
  getOneProgress,
  deleteProgress,
  getLeaderboard
} from '../controllers/progress.controller';

const router = express.Router();

router.get('/:userId', authenticate, getProgress);     // đã có
router.post('/', authenticate, updateProgress);        // đã có

router.get('/me', authenticate, getMyProgress);        // 🆕 lấy toàn bộ
router.get('/me/:exerciseId', authenticate, getOneProgress);  // 🆕 lấy 1 bài
router.delete('/me/:exerciseId', authenticate, deleteProgress); // 🆕 xoá bài
router.get('/leaderboard', getLeaderboard);            // 🆕 xếp hạng

export default router;

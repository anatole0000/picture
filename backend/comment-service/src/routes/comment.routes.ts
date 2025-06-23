import express from 'express';
import { getCommentsByExercise, createComment } from '../controllers/commentController';
import { authenticate } from '../middlewares/auth';

const router = express.Router();

router.get('/:exerciseId', getCommentsByExercise);
router.post('/', authenticate, createComment);

export default router;

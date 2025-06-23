import { Router } from 'express';
import {
  createExercise,
  updateExercise,
  deleteExercise
} from '../controllers/logic.admin.controller';
import { authenticate } from '../middlewares/auth';
import { isAdmin } from '../middlewares/isAdmin';
import { getExercises } from '../controllers/logic.controller';
import { getExerciseById } from '../controllers/logic.controller';

const router = Router();

router.post('/exercises', authenticate, isAdmin, createExercise);
router.get('/exercises/:id', authenticate, isAdmin, getExerciseById);
router.put('/exercises/:id', authenticate, isAdmin, updateExercise);
router.delete('/exercises/:id', authenticate, isAdmin, deleteExercise);
router.get('/exercises', authenticate, isAdmin, getExercises);

export default router;

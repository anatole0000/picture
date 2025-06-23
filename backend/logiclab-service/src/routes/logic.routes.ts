import { Router } from 'express';
import {
  getExercises,
  getExerciseById,
  getHistory,
  getAllExercises,
  getAllSubmissions,
} from '../controllers/logic.controller';
import { authenticate } from '../middlewares/auth';
//import { submitAnswer } from '../controllers/logic.controller';
import { submitAnswer } from '../controllers/logic.s2s';
import { commentOnExercise } from '../controllers/exerciseController';
const router = Router();
import { validateSubmitAnswer } from '../middlewares/validation';
import { handleValidation } from '../middlewares/handleValidation';


router.get('/exercises', authenticate, getExercises);
router.get('/exercises/:id', authenticate, getExerciseById);
router.post('/submit', authenticate, validateSubmitAnswer, handleValidation, submitAnswer);
//router.post('/submit', authenticate, submitAnswer);
router.get('/history', authenticate, getHistory);

router.get('/all-exercises', getAllExercises);
router.get('/all-submissions', getAllSubmissions);

router.post('/:id/comment', authenticate, commentOnExercise);
export default router;

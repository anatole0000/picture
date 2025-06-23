import express from 'express';
import { getAllUsers, getUsersBulk } from '../controllers/user.controller';

const router = express.Router();

router.get('/all', getAllUsers); // 👉 GET /users/all
router.post('/bulk', getUsersBulk);

export default router;

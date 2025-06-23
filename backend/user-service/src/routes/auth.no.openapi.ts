import { Router } from 'express';
import { register, login, me, updateProfile } from '../controllers/auth.controller';
import { validate } from '../middlewares/validate';
import { registerSchema, loginSchema } from '../validators/auth.schema';
import { authenticate } from '../middlewares/auth';
import { updateProfileSchema } from '../validators/auth.schema';
import { forgotPassword } from '../controllers/auth.controller';
import { forgotPasswordSchema, resetPasswordSchema } from '../validators/auth.schema';
import { getUserById, resetPassword  } from '../controllers/auth.controller';

import { createRateLimiter } from '../utils/limiter';
import { cache } from '../middlewares/cache';

const loginLimiter = createRateLimiter(5, 900);         // 5 lần / 15 phút
const registerLimiter = createRateLimiter(3, 600);      // 3 lần / 10 phút
const forgotLimiter = createRateLimiter(3, 1800);       // 3 lần / 30 phút
const resetLimiter = createRateLimiter(3, 1800);        // 3 lần / 30 phút

const router = Router();

router.post('/register', registerLimiter, validate(registerSchema), register);
router.post('/login',loginLimiter, validate(loginSchema), login);
router.get('/me', authenticate, cache(req => `user:me:${(req as any).user.id}`, 60), me);
router.put('/update-profile', authenticate, validate(updateProfileSchema), updateProfile);
router.post('/forgot-password', forgotLimiter, validate(forgotPasswordSchema), forgotPassword);
router.get('/users/:id', authenticate, cache(req => `user:${req.params.id}`, 60), getUserById);
router.post('/reset-password', resetLimiter, validate(resetPasswordSchema), resetPassword);

export default router;

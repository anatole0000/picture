import { Router } from 'express';
import {
  register, login, me, updateProfile,
  forgotPassword, getUserById, resetPassword
} from '../controllers/auth.controller';
import { validate } from '../middlewares/validate';
import {
  registerSchema, loginSchema,
  forgotPasswordSchema, resetPasswordSchema, updateProfileSchema
} from '../validators/auth.schema';
import { authenticate } from '../middlewares/auth';
import { createRateLimiter } from '../utils/limiter';
import { cache } from '../middlewares/cache';

const loginLimiter = createRateLimiter(5, 900);
const registerLimiter = createRateLimiter(3, 600);
const forgotLimiter = createRateLimiter(3, 1800);
const resetLimiter = createRateLimiter(3, 1800);

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication & User Management
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Đăng ký người dùng
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đăng ký thành công
 *       409:
 *         description: Email đã được sử dụng
 */
router.post('/register', registerLimiter, validate(registerSchema), register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Đăng nhập
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *       401:
 *         description: Sai thông tin đăng nhập
 */
router.post('/login', loginLimiter, validate(loginSchema), login);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Lấy thông tin người dùng hiện tại
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Trả về thông tin người dùng
 */
router.get('/me', authenticate, cache(req => `user:me:${(req as any).user.id}`, 60), me);

/**
 * @swagger
 * /auth/update-profile:
 *   put:
 *     summary: Cập nhật hồ sơ người dùng
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 */
router.put('/update-profile', authenticate, validate(updateProfileSchema), updateProfile);

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Gửi email đặt lại mật khẩu
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Gửi thành công (hoặc ẩn danh nếu không tồn tại)
 */
router.post('/forgot-password', forgotLimiter, validate(forgotPasswordSchema), forgotPassword);

/**
 * @swagger
 * /auth/users/{id}:
 *   get:
 *     summary: Lấy thông tin người dùng theo ID
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Trả về thông tin người dùng
 *       404:
 *         description: Không tìm thấy người dùng
 */
router.get('/users/:id', authenticate, cache(req => `user:${req.params.id}`, 60), getUserById);

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Đặt lại mật khẩu
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Thành công
 *       400:
 *         description: Token không hợp lệ
 */
router.post('/reset-password', resetLimiter, validate(resetPasswordSchema), resetPassword);

export default router;

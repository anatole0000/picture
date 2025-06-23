// routes/notifications.routes.ts
import express from 'express';
import { createNotification, getNotificationsByUser } from '../controllers/notifications.controller';

const router = express.Router();

router.post('/', createNotification); // 👈 để services khác gửi
router.get('/:userId', getNotificationsByUser); // 👈 để frontend hiển thị thông báo người dùng

export default router;

import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { prisma } from '../prisma/client';
import { generateToken } from '../utils/jwt';
// import { sendResetEmail } from '../utils/mail';
import { emailQueue } from '../queues/email.queue';
import { redis } from '../utils/redis';

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Kiểm tra xem email đã tồn tại chưa
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    res.status(409).json({ message: 'Email đã được sử dụng.' });
    return;
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { email, password: hashed }
  });

  const token = generateToken(user.id);

  res.json({
    user: {
      email: user.email,
      name: email.split('@')[0],
    },
    token,
  });
};


export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }

  const token = generateToken(user.id);
  res.json({
    user: {
      email: user.email,
      name: user.name || user.email.split('@')[0],
    },
    token,
  });
};

export const me = async (req: Request, res: Response) => {
  const user = (req as any).user;

  res.json({
    id: user.id,              // ✅ Cần cho logiclab để ghi submission
    email: user.email,
    name: user.name || user.email.split('@')[0],
    role: user.role           // ✅ Cần cho middleware isAdmin
  });
};


export const updateProfile = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const { name } = req.body;

  if (!name?.trim()) {
    res.status(400).json({ message: 'Tên không được để trống.' });
    return;
  }

  try {
    const updated = await prisma.user.update({
      where: { id: userId },
      data: { name },
    });

    // ❌ Xoá cache cũ
    await redis.del(`user:me:${userId}`);
    await redis.del(`user:${userId}`);

    res.json({
      message: 'Cập nhật thành công.',
      user: {
        email: updated.email,
        name: updated.name,
      },
    });
  } catch (err) {
    console.error('Lỗi update profile:', err);
    res.status(500).json({ message: 'Cập nhật thất bại', error: err });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    res.json({ message: 'Nếu email tồn tại, bạn sẽ nhận được hướng dẫn.' });
    return;
  }

  const resetToken = crypto.randomBytes(32).toString('hex');

  await prisma.user.update({
    where: { email },
    data: {
      resetToken,
      resetTokenExpiry: new Date(Date.now() + 1000 * 60 * 30), // 30 phút
    },
  });

  await emailQueue.add('sendResetEmail', {
    to: email,
    resetToken,
  });

  res.json({ message: 'Mã đặt lại mật khẩu đã được gửi qua email (nếu tồn tại).' });
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    res.status(404).json({ message: 'Không tìm thấy người dùng.' });
    return;
  }

  res.json({
    id: user.id,
    email: user.email,
    name: user.name || user.email.split('@')[0],
  });
};

export const resetPassword = async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;

  const user = await prisma.user.findFirst({ where: { resetToken: token } });

  if (!user) {
    res.status(400).json({ message: 'Token không hợp lệ hoặc đã hết hạn.' });
    return;
  }

  const hashed = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashed,
      resetToken: null, // xóa token sau khi dùng
    },
  });

  res.json({ message: 'Đặt lại mật khẩu thành công.' });
};

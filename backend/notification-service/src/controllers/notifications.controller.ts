// controllers/notifications.controller.ts
import { Request, Response } from 'express';
import { prisma } from '../prisma/client';

export const createNotification = async (req: Request, res: Response) => {
  const { userId, content } = req.body;

  const notif = await prisma.notification.create({
    data: { userId, content },
  });

  res.status(201).json(notif);
};

export const getNotificationsByUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const notifs = await prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });

  res.json(notifs);
};

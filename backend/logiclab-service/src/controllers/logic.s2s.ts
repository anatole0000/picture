import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { producer } from '../kafka/producer'; // 👈 import Kafka producer

const prisma = new PrismaClient();

export const submitAnswer = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { exerciseId, selected } = req.body;

  try {
    const exercise = await prisma.logicExercise.findUnique({ where: { id: exerciseId } });
    if (!exercise) {
      res.status(404).json({ message: 'Không tìm thấy bài tập' });
      return;
    }

    const isCorrect = selected === exercise.answer;

    const submission = await prisma.logicSubmission.create({
      data: {
        userId: user.id,
        exerciseId,
        selected,
        isCorrect,
      },
    });

    // Gửi notification qua Kafka
    const notifContent = isCorrect
      ? `🎉 Bạn đã trả lời đúng bài '${exercise.title}'!`
      : `❌ Bạn trả lời sai bài '${exercise.title}'. Hãy thử lại!`;

    await producer.send({
      topic: 'notifications',
      messages: [
        {
          value: JSON.stringify({
            userId: user.id,
            content: notifContent,
          }),
        },
      ],
    });

    res.json({ submission });
  } catch (err) {
    console.error('❌ Lỗi khi xử lý submitAnswer:', err);
    res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};

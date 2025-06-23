// controllers/submission.controller.ts
import { Request, Response } from 'express'
import { prisma } from '../prisma/client'

export const createSubmission = async (req: Request, res: Response) => {
  const user = (req as any).user
  const { exerciseId, answer, score, isCorrect } = req.body

  const submission = await prisma.submission.create({
    data: {
      userId: user.id,
      exerciseId,
      answer,
      score,
      isCorrect,
    }
  })

  res.json(submission)
}

export const getUserSubmissions = async (req: Request, res: Response) => {
  const userId = req.params.userId
  const submissions = await prisma.submission.findMany({
    where: { userId },
    orderBy: { submittedAt: 'desc' },
  })

  res.json(submissions)
}


export const getAllSubmissions = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const [total, submissions] = await Promise.all([
    prisma.submission.count(),
    prisma.submission.findMany({
      skip,
      take: limit,
      orderBy: { submittedAt: 'desc' }
    }),
  ]);

  res.json({
    submissions,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  });
};

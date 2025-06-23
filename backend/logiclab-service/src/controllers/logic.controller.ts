import { Request, Response } from 'express';
import { prisma } from '../prisma/client';

// GET exercises with optional filter + pagination
export const getExercises = async (req: Request, res: Response) => {
  try {
    const { difficulty, tag, page = '1', limit = '10' } = req.query;
    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);

    const filter = {
      ...(difficulty ? { difficulty: difficulty as string } : {}),
      ...(tag ? { tags: { has: tag as string } } : {}),
    };

    const [exercises, total] = await Promise.all([
      prisma.logicExercise.findMany({
        where: filter,
        orderBy: { createdAt: 'desc' },
        skip: (pageNum - 1) * limitNum,
        take: limitNum,
      }),
      prisma.logicExercise.count({ where: filter }), // 👈 thêm dòng này
    ]);

    res.json({ page: pageNum, limit: limitNum, total, exercises });
  } catch (error) {
    console.error('Lỗi khi lấy danh sách bài tập:', error);
    res.status(500).json({ message: 'Lỗi server khi lấy bài tập' });
  }
};


// GET exercise by ID
export const getExerciseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const exercise = await prisma.logicExercise.findUnique({ where: { id } });

    if (!exercise) {
      res.status(404).json({ message: 'Không tìm thấy bài tập' });
      return;
    }

    // Ẩn đáp án trước khi trả về
    const { answer: _answer, ...safeExercise } = exercise;
    res.json(safeExercise);
  } catch (error) {
    console.error('Lỗi khi lấy bài tập:', error);
    res.status(500).json({ message: 'Lỗi server khi lấy bài tập' });
  }
};


// POST submit answer
export const submitAnswer = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { exerciseId, selected } = req.body;

    if (!exerciseId || typeof selected !== 'string') {
      res.status(400).json({ message: 'Thiếu hoặc sai định dạng dữ liệu gửi lên' });
      return;
    }

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

    res.json({
      isCorrect,
      submission,
      correctAnswer: isCorrect ? undefined : exercise.answer, // 👈 trả nếu sai
    });
  } catch (error) {
    console.error('Lỗi khi nộp bài:', error);
    res.status(500).json({ message: 'Lỗi server khi nộp bài' });
  }
};


// GET user's submission history with pagination
export const getHistory = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { page = '1', limit = '10' } = req.query;
    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);

    const history = await prisma.logicSubmission.findMany({
      where: { userId: user.id },
      orderBy: { submittedAt: 'desc' },
      include: { exercise: true },
      skip: (pageNum - 1) * limitNum,
      take: limitNum,
    });

    res.json({ page: pageNum, limit: limitNum, history });
  } catch (error) {
    console.error('Lỗi khi lấy lịch sử:', error);
    res.status(500).json({ message: 'Lỗi server khi lấy lịch sử' });
  }
};


export const getAllExercises = async (_req: Request, res: Response) => {
  const exercises = await prisma.logicExercise.findMany({
    orderBy: { createdAt: 'desc' }
  });
  res.json(exercises);
};

export const getAllSubmissions = async (_req: Request, res: Response) => {
  const submissions = await prisma.logicSubmission.findMany({
    include: { exercise: true },
    orderBy: { submittedAt: 'desc' }
  });
  res.json(submissions);
};
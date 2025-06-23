// controllers/statistics.controller.ts
import axios from '../utils/axios'; // ✅ axios now has retry logic
import { Request, Response } from 'express';
import CircuitBreaker from 'opossum';

const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:4001';
const LOGICLAB_SERVICE_URL = process.env.LOGICLAB_SERVICE_URL || 'http://localhost:4002';

const breakerOptions = {
  timeout: 3000,
  errorThresholdPercentage: 50,
  resetTimeout: 10000,
};

const axiosBreaker = (url: string) =>
  new CircuitBreaker(() => axios.get(url), breakerOptions);

const userBreaker = axiosBreaker(`${USER_SERVICE_URL}/users/all`);
const exerciseBreaker = axiosBreaker(`${LOGICLAB_SERVICE_URL}/logic/all-exercises`);
const submissionBreaker = axiosBreaker(`${LOGICLAB_SERVICE_URL}/logic/all-submissions`);

export const getStatistics = async (_req: Request, res: Response) => {
  try {
    const [usersRes, exercisesRes, submissionsRes] = await Promise.all([
      userBreaker.fire(),
      exerciseBreaker.fire(),
      submissionBreaker.fire(),
    ]);

    const users = usersRes.data;
    const exercises = exercisesRes.data;
    const submissions = submissionsRes.data;

    res.json({
      totalUsers: users.length,
      totalExercises: exercises.length,
      totalSubmissions: submissions.length,
      correctSubmissions: submissions.filter((s: any) => s.isCorrect).length,
    });
  } catch (err) {
    console.error('Circuit breaker error:', err);
    res.status(500).json({ message: 'Lỗi khi lấy thống kê' });
  }
};

import request from 'supertest';
import express from 'express';
import { getStatistics } from '../controllers/stats.controller';

// Mock axios
jest.mock('axios');
import axios from 'axios';

const app = express();
app.get('/statistics', getStatistics);

describe('GET /statistics', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return statistics correctly', async () => {
    (axios.get as jest.Mock).mockImplementation((url: string) => {
      if (url.includes('/users/all')) {
        return Promise.resolve({ data: [{ id: 1 }, { id: 2 }] });
      }
      if (url.includes('/logic/all-exercises')) {
        return Promise.resolve({ data: [{ id: 'ex1' }] });
      }
      if (url.includes('/logic/all-submissions')) {
        return Promise.resolve({
          data: [
            { id: 'sub1', isCorrect: true },
            { id: 'sub2', isCorrect: false },
            { id: 'sub3', isCorrect: true },
          ],
        });
      }
      return Promise.reject(new Error('Unknown URL'));
    });

    const res = await request(app).get('/statistics');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      totalUsers: 2,
      totalExercises: 1,
      totalSubmissions: 3,
      correctSubmissions: 2,
    });
  });

  it('should return 500 if error occurs', async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error('Network error'));

    const res = await request(app).get('/statistics');

    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty('message', 'Lỗi khi lấy thống kê');
  });
});

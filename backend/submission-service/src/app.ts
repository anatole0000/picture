import express from 'express';
import dotenv from 'dotenv';
import submissionRoutes from './routes/submission.route'

import cors from 'cors';
dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // 👈 thay bằng địa chỉ frontend của bạn
  credentials: true,               // 👈 nếu dùng cookie auth
}));

app.use(express.json());

app.use('/submissions', submissionRoutes)

export default app;

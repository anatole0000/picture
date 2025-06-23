import express from 'express';
import statsRoutes from './routes/stats.routes';
import dotenv from 'dotenv';

import cors from 'cors'; 

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // 👈 thay bằng địa chỉ frontend của bạn
  credentials: true,               // 👈 nếu dùng cookie auth
}));

app.use(express.json());

app.use('/stats', statsRoutes);

export default app;

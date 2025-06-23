import express from 'express';
import dotenv from 'dotenv';
import commentRoutes from './routes/comment.routes'
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // 👈 thay bằng địa chỉ frontend của bạn
  credentials: true,               // 👈 nếu dùng cookie auth
}));

app.use(express.json());

app.use('/comments', commentRoutes)

export default app;

// app.ts
import express from 'express';
import morgan from 'morgan';
import { logger } from './utils/logger';

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';

import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';

import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

import cors from 'cors'; 
dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // 👈 thay bằng địa chỉ frontend của bạn
  credentials: true,               // 👈 nếu dùng cookie auth
}));

app.use(express.json());

// Log tất cả request
app.use(
  morgan('combined', {
    stream: {
      write: (message) => logger.http(message.trim()),
    },
  })
);

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// (Optional) Global error handler
interface ErrorWithStack extends Error {
    stack?: string;
}

app.use((err: ErrorWithStack, req: Request, res: Response, _next: NextFunction) => {
    logger.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

export default app;

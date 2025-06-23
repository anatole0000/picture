// src/app.ts
import express from 'express';
import dotenv from 'dotenv';
import progressRoutes from './routes/progress.routes';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/progress', progressRoutes);

export default app;

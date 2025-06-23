import express from 'express';
import dotenv from 'dotenv';
import notiRoutes from './routes/notifications.routes'

dotenv.config();

const app = express();
app.use(express.json());

app.use('/notifications', notiRoutes)

export default app;
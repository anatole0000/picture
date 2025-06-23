import express from 'express';
import dotenv from 'dotenv';
import logicRoutes from './routes/logic.routes';
import logicAdminRoutes from './routes/logic.admin.routes';
import cors from 'cors'; 

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // 👈 thay bằng địa chỉ frontend của bạn
  credentials: true,               // 👈 nếu dùng cookie auth
}));

app.use(express.json());

app.use('/logic', logicRoutes); // 👈 mount logic routes
app.use('/api/admin', logicAdminRoutes);

export default app;

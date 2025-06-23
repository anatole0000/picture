import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes';
import exerciseRoutes from './routes/logiclab.routes';
import progressRoutes from './routes/progress.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/', userRoutes);
app.use('/', exerciseRoutes);
app.use('/progress', progressRoutes);

app.listen(PORT, () => {
  console.log(`API Gateway running at http://localhost:${PORT}`);
});

// server.ts
import app from './app';
import { logger } from './utils/logger';


const PORT = process.env.PORT || 4001;


app.listen(PORT, () => {
  logger.info(`🚀 User Service running at http://localhost:${PORT}`);
});

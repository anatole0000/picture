import https from 'https';
import fs from 'fs';
import path from 'path';

import app from './app';
import { logger } from './utils/logger';

const PORT = process.env.PORT || 4001;
const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
  const keyPath = path.join(__dirname, '../certs/localhost-key.pem');
  const certPath = path.join(__dirname, '../certs/localhost.pem');

  if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
    const options = {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath),
    };

    https.createServer(options, app).listen(PORT, () => {
      logger.info(`✅ User Service running with HTTPS on port ${PORT}`);
    });
  } else {
    logger.error('❌ TLS certs not found. Falling back to HTTP.');
    app.listen(PORT, () => {
      logger.info(`⚠️ User Service running on HTTP (no TLS) at http://localhost:${PORT}`);
    });
  }
} else {
  app.listen(PORT, () => {
    logger.info(`🚀 User Service running (dev) at http://localhost:${PORT}`);
  });
}


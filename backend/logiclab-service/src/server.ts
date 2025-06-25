import https from 'https';
import fs from 'fs';
import path from 'path';

import app from './app';
import { connectKafka } from './kafka/producer';

const PORT = process.env.PORT || 4002;
const isProd = process.env.NODE_ENV === 'production';

const startServer = () => {
  if (isProd) {
    const keyPath = path.join(__dirname, '../certs/localhost-key.pem');
    const certPath = path.join(__dirname, '../certs/localhost.pem');

    if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
      const options = {
        key: fs.readFileSync(keyPath),
        cert: fs.readFileSync(certPath),
      };

      https.createServer(options, app).listen(PORT, () => {
        console.log(`✅ LogicLab Service running with HTTPS on port ${PORT}`);
      });
    } else {
      console.warn('❌ TLS certs not found. Falling back to HTTP.');
      app.listen(PORT, () => {
        console.log(`⚠️ LogicLab Service running on HTTP (no TLS) at http://localhost:${PORT}`);
      });
    }
  } else {
    app.listen(PORT, () => {
      console.log(`🚀 LogicLab Service running (dev) at http://localhost:${PORT}`);
    });
  }
};

// 👉 Kết nối Kafka trước khi chạy server
connectKafka().then(() => {
  console.log('✅ Kafka connected');
  startServer();
});

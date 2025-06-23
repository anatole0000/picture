// utils/logger.ts
import winston from 'winston';
import LokiTransport from 'winston-loki';

export const logger = winston.createLogger({
  level: 'http',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),

    // ✅ Thêm Loki
    new LokiTransport({
      host: 'http://localhost:3100', // URL của Loki
      labels: { app: 'user-service', env: 'dev' }, // Tùy chỉnh nhãn log
      json: true,
    }),
  ],
});

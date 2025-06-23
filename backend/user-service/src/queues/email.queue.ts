// src/queues/email.queue.ts
import { Queue } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis({
  host: 'localhost',
  port: 6379,
  maxRetriesPerRequest: null, // ✅ Fix lỗi ở đây
});

export const emailQueue = new Queue('email', { connection });

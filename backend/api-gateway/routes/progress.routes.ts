import express from 'express';
import proxy from 'express-http-proxy';

const router = express.Router();

const PROGRESS_SERVICE_URL = process.env.PROGRESS_SERVICE_URL || 'http://localhost:4003';

router.use(
  '/',
  proxy(PROGRESS_SERVICE_URL, {
    proxyReqPathResolver: (req) => `/progress${req.url}`,
  })
);

export default router;

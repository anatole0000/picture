import express from 'express';
import proxy from 'express-http-proxy';
const router = express.Router();

const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:4001';

router.use('/', proxy(USER_SERVICE_URL));

export default router;

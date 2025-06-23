import express from 'express';
import proxy from 'express-http-proxy';
const router = express.Router();

const LOGICLAB_SERVICE_URL = process.env.LOGICLAB_SERVICE_URL || 'http://localhost:4002';

router.use('/', proxy(LOGICLAB_SERVICE_URL));

export default router;

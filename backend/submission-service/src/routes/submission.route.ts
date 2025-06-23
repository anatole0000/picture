// routes/submission.route.ts
import express from 'express'
import { authenticate } from '../middlewares/auth'
import { createSubmission, getUserSubmissions, getAllSubmissions } from '../controllers/submission.controller'

const router = express.Router()

router.post('/', authenticate, createSubmission)
router.get('/:userId', authenticate, getUserSubmissions)
router.get('/', authenticate, getAllSubmissions);

export default router

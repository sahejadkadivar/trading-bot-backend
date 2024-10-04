import express from 'express';
import { getProfitLossSummary } from '../controllers/profitController.js';

const router = express.Router();

/**
 * @swagger
 * /api/profit/summary:
 *   get:
 *     summary: Get profit/loss summary
 *     tags: [Profit]
 *     responses:
 *       200:
 *         description: Total profit or loss
 */
router.get('/summary', getProfitLossSummary);

export default router;

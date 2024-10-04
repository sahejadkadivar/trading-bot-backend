// import express from 'express';
// import { getCurrentStockPrices } from '../controllers/stockController.js';

// const router = express.Router();

// router.get('/prices', getCurrentStockPrices);

// export default router;

import express from 'express';
import { getCurrentStockPrices } from '../controllers/stockController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();


/**
 * @swagger
 * /api/stocks:
 *   get:
 *     summary: Get all monitored stock prices
 *     tags: [Stocks]
 *     security:
 *       - bearerAuth: []  # JWT Authentication
 *     responses:
 *       200:
 *         description: All monitored stocks and their prices
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   symbol:
 *                     type: string
 *                     example: AAPL
 *                   price:
 *                     type: number
 *                     example: 145.67
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Unauthorized (JWT required)
 *       500:
 *         description: Internal server error
 */
router.get('/', authMiddleware, getCurrentStockPrices);

export default router;

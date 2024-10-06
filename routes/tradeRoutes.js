// import { Router } from 'express';
// import tradeController from '../controllers/tradeController.js';
// import authMiddleware from '../middleware/authMiddleware.js';

// const router = Router();

// router.post('/execute', authMiddleware, tradeController.execute);
// router.get('/all', authMiddleware, tradeController.getAllTrades);
// router.post('/trade', authMiddleware, tradeController.makeTrade);


// export default router;

import express from 'express';
import tradeController from '../controllers/tradeController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/trades/execute:
 *   post:
 *     summary: Manually execute a trade for a given stock
 *     tags: [Trades]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - stock
 *             properties:
 *               stock:
 *                 type: string
 *                 example: stockA
 *                 description: Symbol of the stock to trade
 *     responses:
 *       200:
 *         description: Trade executed successfully or no trade made
 *       400:
 *         description: Stock is required
 *       500:
 *         description: Trade execution failed due to server error
 */
router.post('/execute', authMiddleware, tradeController.execute);

/**
 * @swagger
 * /api/trades/all:
 *   get:
 *     summary: Get all trade history
 *     tags: [Trades]
 *     responses:
 *       200:
 *         description: A list of trades
 */
router.get('/all', authMiddleware, tradeController.getAllTrades);

/**
 * @swagger
 * /api/trades/trade:
 *   post:
 *     summary: Make a trade (buy or sell)
 *     tags: [Trades]
 *     security:
 *       - bearerAuth: []  # JWT Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               stockSymbol:
 *                 type: string
 *                 example: stockA
 *               tradeType:
 *                 type: string
 *                 enum: [buy, sell]
 *                 example: buy
 *               quantity:
 *                 type: integer
 *                 example: 10
 *               price:
 *                 type: number
 *                 example: 145.67
 *     responses:
 *       200:
 *         description: Trade executed successfully
 *       401:
 *         description: Unauthorized (JWT required)
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/trade', authMiddleware, tradeController.makeTrade);


export default router;

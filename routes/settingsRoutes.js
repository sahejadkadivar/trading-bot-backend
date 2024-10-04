// import express from 'express';
// import { getBotSettings, updateBotSettings } from '../controllers/botSettingsController.js';

// const router = express.Router();

// router.get('/', getBotSettings);
// router.post('/', updateBotSettings);

// export default router;


import express from 'express';
import { getBotSettings, updateBotSettings } from '../controllers/botSettingsController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/settings:
 *   get:
 *     summary: Get the current trading bot settings
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []  # JWT Authentication
 *     responses:
 *       200:
 *         description: Current settings retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 buyThreshold:
 *                   type: number
 *                   example: -2
 *                 sellThreshold:
 *                   type: number
 *                   example: 3
 *                 strategy:
 *                   type: string
 *                   example: moving-average
 *       401:
 *         description: Unauthorized (JWT required)
 *       500:
 *         description: Internal server error
 */
router.get('/', authMiddleware, getBotSettings);

/**
 * @swagger
 * /api/settings:
 *   post:
 *     summary: Update the trading bot settings
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []  # JWT Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               buyThreshold:
 *                 type: number
 *                 example: -2
 *               sellThreshold:
 *                 type: number
 *                 example: 3
 *               strategy:
 *                 type: string
 *                 example: moving-average
 *     responses:
 *       200:
 *         description: Settings updated successfully
 *       400:
 *         description: Invalid data provided
 *       401:
 *         description: Unauthorized (JWT required)
 *       500:
 *         description: Internal server error
 */
router.post('/', authMiddleware, updateBotSettings);

export default router;

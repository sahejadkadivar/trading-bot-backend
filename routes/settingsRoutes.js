import express from 'express';
import { getBotSettings, updateBotSettings } from '../controllers/botSettingsController.js';

const router = express.Router();

router.get('/settings', getBotSettings);
router.post('/settings', updateBotSettings);

export default router;

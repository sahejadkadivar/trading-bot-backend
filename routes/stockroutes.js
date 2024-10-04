import express from 'express';
import { getCurrentStockPrices } from '../controllers/stockController.js';

const router = express.Router();

router.get('/prices', getCurrentStockPrices);

export default router;

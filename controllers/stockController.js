import { mockStockPrices } from '../services/tradeBot.js'; // Import from the trade service

export const getCurrentStockPrices = (req, res) => {
  res.status(200).json(mockStockPrices); // Send back mock prices
};

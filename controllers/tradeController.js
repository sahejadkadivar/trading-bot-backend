import tradeRepository from '../repositories/tradeRepository.js';
import { executeTrade } from '../services/tradeBot.js';

class TradeController {
    async execute(req, res) {
        const { stock } = req.body;

        // Validate if stock is provided
        if (!stock) {
            return res.status(400).json({ error: 'Stock is required' });
        }

        try {
            const tradeResult = await executeTrade(stock);
            if (tradeResult) {
                const trade = await tradeRepository.createTrade(tradeResult);
                res.status(200).json({ message: 'Trade executed', trade });
            } else {
                res.status(200).json({ message: 'No trade made' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Trade execution failed', details: error.message });
        }
    }

    async getAllTrades(req, res) {
        try {
            const trades = await tradeRepository.getTrades();
            res.status(200).json(trades);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch trades', details: error.message });
        }
    }

    async makeTrade(req, res) {
        const { stock } = req.body;  // Stock symbol passed in the request body
        const tradeDecision = await executeTrade(stock);

        if (tradeDecision) {
            res.status(200).json({
                message: `Trade executed: ${tradeDecision.action} ${stock} at price ${tradeDecision.price}`,
            });
        } else {
            res.status(200).json({ message: 'No trade action was taken' });
        }
    }

}

export default new TradeController();
import Trade from '../models/tradeModel.js';

class TradeRepository {
  async createTrade(tradeData) {
    const trade = new Trade(tradeData);
    return await trade.save();
  }

  async getTrades() {
    return await Trade.find();
  }
}

export default new TradeRepository();

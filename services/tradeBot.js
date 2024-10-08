import Trade from "../models/tradeModel.js";

export const mockStockPrices = {
  stockA: {
    price: 100, // changed 'Price' to 'price'
    buyThreshold: 98,
    sellThreshold: 103
  },
  stockB: {
    price: 200, // changed 'Price' to 'price'
    buyThreshold: 196,
    sellThreshold: 206
  }
};

const priceChangeSimulator = () => {
  const randomPercentChange = () => (Math.random() * 4 - 2) / 100; // Random change between -2% and +2%
  Object.keys(mockStockPrices).forEach(stock => {
    const currentPrice = mockStockPrices[stock].price;
    const percentChange = randomPercentChange();
    mockStockPrices[stock].price = parseFloat((currentPrice * (1 + percentChange)).toFixed(2));
  });
};

export const tradingStrategy = (stock) => {
  const price = mockStockPrices[stock].price;
  const buyThreshold = mockStockPrices[stock].buyThreshold;
  const sellThreshold = mockStockPrices[stock].sellThreshold;

  if (price <= buyThreshold) {
    return { action: 'buy', price };
  } else if (price >= sellThreshold) {
    return { action: 'sell', price };
  }
  return null;
};

export const executeTrade = async (stock) => {
  const tradeDecision = tradingStrategy(stock);
  if (!tradeDecision) return null;

  const { action, price } = tradeDecision;

  if (action === 'buy') {
    // Store the buy trade in the database
    const newTrade = new Trade({
      stock,
      action,
      price,
      quantity: 1,
      buyPrice: price
    });
    await newTrade.save();
    console.log(`Bought ${stock} at price $${price}`);
  } else if (action === 'sell') {
    // Fetch the last buy price from the database to calculate profit/loss
    const lastBuy = await Trade.findOne({ stock, action: 'buy' }).sort({ date: -1 });
    if (!lastBuy) {
      console.log(`No record of buying ${stock}, skipping sell.`);
      return null;
    }

    const profitOrLoss = (price - lastBuy.buyPrice) * lastBuy.quantity;

    // Store the sell trade and calculate profit/loss
    const sellTrade = new Trade({
      stock,
      action,
      price,
      quantity: lastBuy.quantity,
      profitOrLoss,
      buyPrice: lastBuy.buyPrice
    });
    await sellTrade.save();

    console.log(`Sold ${stock} at price $${price} | Profit/Loss: $${profitOrLoss.toFixed(2)}`);
  }

  return tradeDecision;
};

// Continuous Monitoring Service
export const startPriceMonitoring = () => {
  console.log('Starting stock price monitoring...');

  // Monitor stock prices every 10 seconds
  setInterval(() => {
    priceChangeSimulator();
    Object.keys(mockStockPrices).forEach(stock => {
      // console.log(mockStockPrices[stock]); 
      console.log(`Current price of ${stock}: $${mockStockPrices[stock].price}`);
      executeTrade(stock);
    });
  }, 10000); // Monitor every 10 seconds (adjust as needed)
};

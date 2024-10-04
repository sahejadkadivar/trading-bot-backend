// Assuming there's a global or config-based settings object
let botSettings = {
    buyThreshold: 0.98,  // 2% drop
    sellThreshold: 1.03, // 3% rise
  };
  
  export const getBotSettings = (req, res) => {
    res.status(200).json(botSettings);
  };
  
  export const updateBotSettings = (req, res) => {
    const { buyThreshold, sellThreshold } = req.body;
  
    if (buyThreshold) botSettings.buyThreshold = buyThreshold;
    if (sellThreshold) botSettings.sellThreshold = sellThreshold;
  
    res.status(200).json({ message: 'Bot settings updated', botSettings });
  };
  
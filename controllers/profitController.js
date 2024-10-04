import Trade from "../models/tradeModel.js";

// Fetch summary of profit and loss
export const getProfitLossSummary = async (req, res) => {
  try {
    // Calculate the total profit/loss by summing all the 'sell' trades
    const profitOrLoss = await Trade.aggregate([
      { $match: { action: 'sell' } },  // Only consider 'sell' actions
      { $group: { _id: null, totalProfitLoss: { $sum: "$profitOrLoss" } } }
    ]);

    const totalProfitLoss = profitOrLoss.length > 0 ? profitOrLoss[0].totalProfitLoss : 0;

    res.status(200).json({ totalProfitLoss });
  } catch (error) {
    console.error('Error fetching profit/loss summary', error);
    res.status(500).json({ message: 'Server error' });
  }
};

import mongoose from 'mongoose';

const tradeSchema = new mongoose.Schema({
    stock: {
        type: String,
        required: true
    },
    action: {
        type: String,
        enum: ['buy', 'sell'],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    quantity: { 
        type: Number, 
        required: true, 
        default: 1 
    },
    profitOrLoss: { type: Number },
    buyPrice: { type: Number }
});

const Trade = mongoose.model('Trade', tradeSchema);
export default Trade;

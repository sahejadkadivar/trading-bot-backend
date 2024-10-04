import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import tradeRoutes from './routes/tradeRoutes.js';
import profitRoutes from './routes/profitRoutes.js';
import settingRoutes from './routes/settingsRoutes.js'
import stockRoutes from './routes/stockroutes.js'; 
import { startPriceMonitoring } from './services/tradeBot.js'; // Import the monitoring service
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './config/swaggerConfig.js'; // Import the swagger configuration


dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.get('/', (req, res)=>{
    res.send("Kindly visit http://localhost:5000/api-docs for test API");
})

app.use('/api/auth', authRoutes);
app.use('/api/trades', tradeRoutes);
app.use('/api/profit', profitRoutes);
app.use('/api/settings', settingRoutes); 
app.use('/api/stocks', stockRoutes);

// Swagger UI route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Start the stock price monitoring
startPriceMonitoring();  // This will keep running in the background


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

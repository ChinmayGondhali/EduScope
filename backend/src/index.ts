import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { errorMiddleware } from './errors';
import { logger } from './utils/logger';
import authRoutes from './routes/auth';
import collegeRoutes from './routes/colleges';
import userRoutes from './routes/user';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/colleges', collegeRoutes);
app.use('/api', userRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error Handling
app.use(errorMiddleware);

app.listen(port, () => {
  logger.info(`Backend server running at http://localhost:${port}`, undefined, 'SYSTEM');
});

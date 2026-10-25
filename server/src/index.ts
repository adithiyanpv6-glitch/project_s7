import express from 'express';
import cors from 'cors';
import { config } from './config';
import { errorHandler } from './middleware/error';

// Import Route Handlers
import authRoutes from './routes/auth.routes';
import studentRoutes from './routes/student.routes';
import practiceRoutes from './routes/practice.routes';
import codingRoutes from './routes/coding.routes';
import mockTestRoutes from './routes/mocktests.routes';
import interviewRoutes from './routes/interview.routes';
import resumeRoutes from './routes/resume.routes';
import companyRoutes from './routes/company.routes';
import adminRoutes from './routes/admin.routes';
import notificationRoutes from './routes/notification.routes';

const app = express();

// Global Middlewares
app.use(cors({
  origin: '*',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'PlacementPrep API Engine',
  });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/practice', practiceRoutes);
app.use('/api/coding', codingRoutes);
app.use('/api/mocktests', mockTestRoutes);
app.use('/api/interviews', interviewRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/notifications', notificationRoutes);

// Error Handler
app.use(errorHandler);

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`🚀 PlacementPrep Backend Server running on http://localhost:${PORT}`);
});

export default app;

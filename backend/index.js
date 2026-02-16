import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.listen(4000, () => console.log('Backend running on http://localhost:4000'));

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import usersRoutes from './routes/users.routes';
import tablesRoutes from './routes/tables.routes';
import categoriesRoutes from './routes/categories.routes';
import menuItemsRoutes from './routes/menuItems.routes';
import reservationsRoutes from './routes/reservations.routes';
import ordersRoutes from './routes/orders.routes';
import orderItemsRoutes from './routes/orderItems.routes';
import paymentsRoutes from './routes/payments.routes';
import uploadRoutes from './routes/upload.routes';
import authRoutes from './routes/auth.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health Check
app.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'Restaurant API is running',
    version: '1.0.0',
    endpoints: [
      'GET /api/users',
      'GET /api/tables',
      'GET /api/categories',
      'GET /api/menu-items',
      'GET /api/reservations',
      'GET /api/orders',
      'GET /api/order-items',
      'GET /api/payments',
    ],
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/tables', tablesRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/menu-items', uploadRoutes);     // upload ต้องอยู่ก่อน
app.use('/api/menu-items', menuItemsRoutes);
app.use('/api/reservations', reservationsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/order-items', orderItemsRoutes);
app.use('/api/payments', paymentsRoutes);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// รัน local server เฉพาะตอน dev (Vercel จัดการ server เอง)
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`🚀 Restaurant API running on http://localhost:${PORT}`);
  });
}

export default app;

// src/app.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { createServer } from 'http';
import { Server as SocketServer } from 'socket.io';

import { env } from './config/env';
import { logger } from './config/logger';
import authRoutes from './routes/auth.routes';
import chatRoutes from './routes/chat.routes';
import { rateLimiter } from './middlewares/rateLimiter.middleware';
import { errorHandler } from './middlewares/errorHandler.middleware';

const app = express();
const httpServer = createServer(app);
const io = new SocketServer(httpServer, {
  cors: {
    origin: env.corsOrigin,
    credentials: true,
  },
});

// Middlewares
app.use(helmet());
app.use(cors({
  origin: env.corsOrigin,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('combined', { stream: { write: (msg) => logger.info(msg.trim()) } }));
app.use(rateLimiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

// Health check
// app.get('/health', (req, res) => {
//   res.json({ status: 'ok', timestamp: new Date().toISOString() });
// });

// WebSocket handling
io.on('connection', (socket) => {
  logger.info(`Socket connected: ${socket.id}`);

  socket.on('join-room', (data) => {
    socket.join(data.conversationId);
    logger.info(`Socket ${socket.id} joined room ${data.conversationId}`);
  });

  socket.on('send-message', (data) => {
    io.to(data.conversationId).emit('new-message', data);
  });

  socket.on('typing', (data) => {
    socket.to(data.conversationId).emit('typing', data);
  });

  socket.on('disconnect', () => {
    logger.info(`Socket disconnected: ${socket.id}`);
  });
});

// Error handler
app.use(errorHandler);

// Start server
httpServer.listen(env.port, () => {
  console.log(`🚀 Server running on port ${env.port}`);
  console.log(`📍 Environment: ${env.nodeEnv}`);
});

export { app, io };
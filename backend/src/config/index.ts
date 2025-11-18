import dotenv from 'dotenv';

dotenv.config();

const getCorsOrigins = () => {
  if (process.env.NODE_ENV === 'production') {
    return process.env.CORS_ORIGINS?.split(',') || [];
  }
  // Allow multiple local ports for development
  return ['http://localhost:3000', 'http://localhost:5173'];
};

export const config = {
  env: process.env.NODE_ENV || 'development',
  api: {
    port: parseInt(process.env.PORT || '3000', 10),
    version: process.env.API_VERSION || 'v1',
    cors: {
      origin: getCorsOrigins(),
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
      exposedHeaders: ['X-Total-Count', 'X-Page-Count'],
      maxAge: 86400, // 24 hours
    },
  },
  // Add other configurations like database, security, etc. as needed
};

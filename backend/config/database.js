import { PrismaClient } from '@prisma/client';

let prisma;

try {
  prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });
  
  console.log('🔍 Database Configuration Debug:');
  console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
  if (process.env.DATABASE_URL) {
    console.log('DATABASE_URL starts with:', process.env.DATABASE_URL.substring(0, 20) + '...');
  }
  console.log('NODE_ENV:', process.env.NODE_ENV);
  
} catch (error) {
  console.error('❌ Prisma Client initialization failed:', error.message);
  // Create a mock prisma client for graceful degradation
  prisma = {
    $connect: () => Promise.reject(new Error('Database not available')),
    $disconnect: () => Promise.resolve(),
    user: {
      create: () => Promise.reject(new Error('Database not available')),
      findFirst: () => Promise.reject(new Error('Database not available')),
      findUnique: () => Promise.reject(new Error('Database not available')),
      update: () => Promise.reject(new Error('Database not available')),
    }
  };
}

// Handle graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

export default prisma;

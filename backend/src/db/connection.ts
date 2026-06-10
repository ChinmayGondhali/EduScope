import { Pool, PoolClient } from 'pg';
import { dbConfig } from './config';
import { logger } from '../utils/logger';

/**
 * Extend global type for database pool
 */
declare global {
  var dbPool: Pool | undefined;
}

/**
 * Global pool instance to prevent multiple pools in development (Next.js HMR)
 */
let pool: Pool;

if (process.env.NODE_ENV === 'production') {
  pool = new Pool(dbConfig);
} else {
  if (!global.dbPool) {
    global.dbPool = new Pool(dbConfig);
  }
  pool = global.dbPool;
}

/**
 * Event listeners for the connection pool
 */
pool.on('connect', () => {
  logger.info('Database connection established', undefined, 'DATABASE');
});

pool.on('error', (err) => {
  logger.error('Unexpected error on idle database client', err, 'DATABASE');
  // In production, we might want to alert or crash depending on the error
});

/**
 * Get a client from the pool for transactions or multiple queries
 */
export const getClient = async (): Promise<PoolClient> => {
  const client = await pool.connect();
  return client;
};

/**
 * Export the pool instance for general use
 */
export { pool };

/**
 * Graceful shutdown helper
 */
export const closePool = async () => {
  logger.info('Closing database pool...', undefined, 'DATABASE');
  await pool.end();
  logger.info('Database pool closed', undefined, 'DATABASE');
};

// Handle process termination for graceful shutdown
if (process.env.NODE_ENV === 'production') {
  process.on('SIGTERM', async () => {
    logger.info('SIGTERM received. Cleaning up...', undefined, 'SYSTEM');
    await closePool();
    process.exit(0);
  });

  process.on('SIGINT', async () => {
    logger.info('SIGINT received. Cleaning up...', undefined, 'SYSTEM');
    await closePool();
    process.exit(0);
  });
}

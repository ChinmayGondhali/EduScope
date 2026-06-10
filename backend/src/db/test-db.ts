import { pool } from './connection';
import { logger } from '../utils/logger';

async function testConnection() {
  try {
    const res = await pool.query('SELECT NOW()');
    logger.info('✅ Database connection successful!', res.rows[0]);
    
    // Check if users table exists
    const tableRes = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'users'
      );
    `);
    logger.info('Users table exists:', tableRes.rows[0].exists);
    
    if (tableRes.rows[0].exists) {
      const columns = await pool.query(`
        SELECT column_name, data_type 
        FROM information_schema.columns 
        WHERE table_name = 'users';
      `);
      logger.info('Users table columns:', columns.rows);
    }
    
  } catch (err) {
    logger.error('❌ Database connection failed!', err);
  } finally {
    await pool.end();
  }
}

testConnection();

import { pool } from './connection';
import { logger } from '../utils/logger';

async function checkCloudDB() {
  try {
    const dbName = await pool.query('SELECT current_database()');
    const currentUser = await pool.query('SELECT current_user');
    logger.info(`Connected to Database: ${dbName.rows[0].current_database}`);
    logger.info(`Connected as User: ${currentUser.rows[0].current_user}`);

    const tables = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    if (tables.rows.length === 0) {
      logger.error('❌ No tables found in the public schema of this database!');
    } else {
      logger.info('✅ Found tables:', tables.rows.map(t => t.table_name));
    }
  } catch (err) {
    logger.error('❌ Failed to check database:', err);
  } finally {
    await pool.end();
  }
}

checkCloudDB();

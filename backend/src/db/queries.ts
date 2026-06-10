import { pool, getClient } from './connection';
import { QueryResult, QueryResultRow } from 'pg';
import { logger } from '../utils/logger';

/**
 * Generic query executor
 */
export async function query<T extends QueryResultRow = any>(
  text: string,
  params?: any[]
): Promise<QueryResult<T>> {
  const start = Date.now();
  try {
    const res = await pool.query<T>(text, params);
    const duration = Date.now() - start;
    
    logger.debug('Executed query', { text, duration, rows: res.rowCount }, 'DATABASE');
    
    return res;
  } catch (error: any) {
    logger.error('Database query error', {
      message: error.message,
      text,
      params,
    }, 'DATABASE');
    throw error;
  }
}

/**
 * Fetch a single row or null
 */
export async function findOne<T extends QueryResultRow = any>(
  text: string,
  params?: any[]
): Promise<T | null> {
  const res = await query<T>(text, params);
  return res.rows.length > 0 ? res.rows[0] : null;
}

/**
 * Fetch many rows
 */
export async function findMany<T extends QueryResultRow = any>(
  text: string,
  params?: any[]
): Promise<T[]> {
  const res = await query<T>(text, params);
  return res.rows;
}

/**
 * Execute a transaction
 */
export async function withTransaction<T>(
  callback: (client: any) => Promise<T>
): Promise<T> {
  const client = await getClient();
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

/**
 * Health check helper
 */
export async function checkDatabaseHealth(): Promise<boolean> {
  try {
    await query('SELECT 1');
    return true;
  } catch (error) {
    return false;
  }
}

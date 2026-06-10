import { z } from 'zod';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const envSchema = z.object({
  DATABASE_URL: z.string().url().optional(),
  DB_HOST: z.string().default('localhost'),
  DB_PORT: z.coerce.number().default(5432),
  DB_USER: z.string().default('postgres'),
  DB_PASSWORD: z.string().default('postgres'),
  DB_NAME: z.string().default('college_discovery'),
  DB_SSL: z.string().transform((val) => val === 'true').default('false'),
  DB_MAX_CONNECTIONS: z.coerce.number().default(20),
  DB_IDLE_TIMEOUT_MS: z.coerce.number().default(30000),
  DB_CONNECTION_TIMEOUT_MS: z.coerce.number().default(2000),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error('❌ Invalid environment variables:', env.error.format());
  throw new Error('Invalid environment variables');
}

export const dbConfig = {
  connectionString: env.data.DATABASE_URL,
  host: env.data.DB_HOST,
  port: env.data.DB_PORT,
  user: env.data.DB_USER,
  password: env.data.DB_PASSWORD,
  database: env.data.DB_NAME,
  ssl: env.data.DB_SSL ? { rejectUnauthorized: false } : false,
  max: env.data.DB_MAX_CONNECTIONS,
  idleTimeoutMillis: env.data.DB_IDLE_TIMEOUT_MS,
  connectionTimeoutMillis: env.data.DB_CONNECTION_TIMEOUT_MS,
};

export type DbConfig = typeof dbConfig;

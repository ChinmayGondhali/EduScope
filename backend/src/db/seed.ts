import { pool } from './connection';
import { logger } from '@/utils/logger';

async function seedData() {
  try {
    // 1. Create Tables
    logger.info('Creating tables...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS colleges (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        description TEXT,
        location TEXT NOT NULL,
        fees INTEGER NOT NULL,
        rating DECIMAL(3,2) DEFAULT 0,
        placement_rate INTEGER DEFAULT 0,
        average_package TEXT,
        highest_package TEXT,
        image_url TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS courses (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        college_id UUID REFERENCES colleges(id) ON DELETE CASCADE,
        course_name TEXT NOT NULL,
        duration TEXT NOT NULL,
        fees INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS reviews (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        college_id UUID REFERENCES colleges(id) ON DELETE CASCADE,
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        rating INTEGER CHECK (rating >= 1 AND rating <= 5),
        review_text TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS saved_colleges (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        college_id UUID REFERENCES colleges(id) ON DELETE CASCADE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, college_id)
      );

      CREATE TABLE IF NOT EXISTS applications (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        college_id UUID REFERENCES colleges(id) ON DELETE CASCADE,
        status TEXT DEFAULT 'pending',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, college_id)
      );
    `);

    // 2. Insert Sample Colleges
    logger.info('Inserting sample colleges...');
    const collegeResult = await pool.query(`
      INSERT INTO colleges (name, description, location, fees, rating, placement_rate, average_package, highest_package, image_url)
      VALUES 
      ('IIT Bombay', 'Premier engineering institute in India.', 'Mumbai, Maharashtra', 211000, 4.9, 98, '22.5 LPA', '1.6 CPA', 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800'),
      ('BITS Pilani', 'Top private research university.', 'Pilani, Rajasthan', 450000, 4.7, 95, '18 LPA', '60 LPA', 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=800'),
      ('St. Stephens College', 'Prestigious liberal arts college.', 'New Delhi, Delhi', 120000, 4.5, 88, '10 LPA', '25 LPA', 'https://images.unsplash.com/photo-1498243639351-a75d7f814507?q=80&w=800')
      ON CONFLICT DO NOTHING
      RETURNING id, name;
    `);

    if (collegeResult.rows.length > 0) {
      logger.info(`Inserted ${collegeResult.rows.length} colleges.`);
      
      // 3. Insert Courses for the first college
      const iitId = collegeResult.rows[0].id;
      await pool.query(`
        INSERT INTO courses (college_id, course_name, duration, fees)
        VALUES 
        ($1, 'Computer Science', '4 Years', 211000),
        ($1, 'Electrical Engineering', '4 Years', 205000)
      `, [iitId]);
      logger.info('Inserted sample courses.');
    }

    logger.info('✅ Database setup and seeding complete!');
  } catch (err) {
    logger.error('❌ Setup failed:', err);
  } finally {
    await pool.end();
  }
}

seedData();

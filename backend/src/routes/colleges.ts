import { Router } from 'express';
import { query, findMany, findOne } from '../db/queries';
import { collegeQuerySchema, uuidParamSchema, compareQuerySchema, validateData } from '../validations';
import { NotFoundError } from '../errors';

const router = Router();

// list colleges
router.get('/', async (req, res, next) => {
  try {
    const data = await validateData(collegeQuerySchema, req.query);
    const { search, location, rating, minFees, maxFees, page, limit, sortBy, sortOrder } = data;

    const offset = (page - 1) * limit;
    const values: any[] = [];
    const conditions: string[] = [];

    if (search) {
      values.push(`%${search}%`);
      conditions.push(`name ILIKE $${values.length}`);
    }
    if (location) {
      values.push(`%${location}%`);
      conditions.push(`location ILIKE $${values.length}`);
    }
    if (rating) {
      values.push(rating);
      conditions.push(`rating >= $${values.length}`);
    }
    if (minFees) {
      values.push(minFees);
      conditions.push(`fees >= $${values.length}`);
    }
    if (maxFees) {
      values.push(maxFees);
      conditions.push(`fees <= $${values.length}`);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const countResult = await query(`SELECT COUNT(*) FROM colleges ${whereClause}`, values);
    const totalItems = parseInt(countResult.rows[0].count);
    const totalPages = Math.ceil(totalItems / limit);

    const colleges = await findMany(`
      SELECT id, name, location, fees, rating, placement_rate, average_package, highest_package, image_url, created_at
      FROM colleges
      ${whereClause}
      ORDER BY ${sortBy} ${sortOrder}
      LIMIT ${limit} OFFSET ${offset}
    `, values);

    res.json({
      success: true,
      data: colleges,
      pagination: { page, limit, totalItems, totalPages, hasNextPage: page < totalPages, hasPrevPage: page > 1 }
    });
  } catch (error) {
    next(error);
  }
});

// featured colleges
router.get('/featured', async (req, res, next) => {
  try {
    const colleges = await findMany(`
      SELECT id, name, location, fees, rating, placement_rate, average_package, highest_package, image_url, created_at
      FROM colleges
      ORDER BY rating DESC
      LIMIT 3
    `);
    res.json({ success: true, data: colleges });
  } catch (error) {
    next(error);
  }
});

// compare colleges
router.get('/compare', async (req, res, next) => {
  try {
    const data = await validateData(compareQuerySchema, req.query);
    const colleges = await findMany(`
      SELECT id, name, location, fees, rating, placement_rate, average_package, highest_package, image_url
      FROM colleges
      WHERE id = ANY($1::uuid[])
    `, [data.ids]);

    if (colleges.length === 0) throw new NotFoundError('None of the requested colleges were found');
    res.json({ success: true, count: colleges.length, data: colleges });
  } catch (error) {
    next(error);
  }
});

// college detail
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = await validateData(uuidParamSchema, req.params);
    const college = await findOne(`
      SELECT id, name, description, location, fees, rating as static_rating, placement_rate, average_package, highest_package, image_url, created_at
      FROM colleges
      WHERE id = $1
    `, [id]);

    if (!college) throw new NotFoundError('College not found');

    const [courses, reviews] = await Promise.all([
      findMany('SELECT id, course_name, duration, fees FROM courses WHERE college_id = $1 ORDER BY fees ASC', [id]),
      findMany(`
        SELECT r.id, r.rating, r.review_text, r.created_at, u.name as user_name
        FROM reviews r
        JOIN users u ON r.user_id = u.id
        WHERE r.college_id = $1
        ORDER BY r.created_at DESC
      `, [id])
    ]);

    const totalReviews = reviews.length;
    const averageRating = totalReviews > 0
      ? Number((reviews.reduce((acc, rev) => acc + rev.rating, 0) / totalReviews).toFixed(1))
      : Number(college.static_rating);

    res.json({
      success: true,
      data: {
        ...college,
        rating: averageRating,
        total_reviews: totalReviews,
        courses,
        reviews,
        placement_stats: { rate: college.placement_rate, average_package: college.average_package, highest_package: college.highest_package }
      }
    });
  } catch (error) {
    next(error);
  }
});

export default router;

import { Router } from 'express';
import { query, findMany, findOne } from '../db/queries';
import { saveCollegeSchema, uuidParamSchema, validateData } from '../validations';
import { NotFoundError } from '../errors';
import { authMiddleware } from '../auth/withAuth';

const router = Router();
router.use(authMiddleware);

// dashboard
router.get('/dashboard', async (req, res, next) => {
  try {
    // @ts-ignore
    const user = req.user;
    const [userProfile, savedColleges, stats] = await Promise.all([
      findOne('SELECT id, name, email, created_at FROM users WHERE id = $1', [user.id]),
      findMany(`
        SELECT c.id, c.name, c.location, c.fees, c.rating, c.image_url, sc.id as save_id
        FROM colleges c
        JOIN saved_colleges sc ON c.id = sc.college_id
        WHERE sc.user_id = $1
        ORDER BY sc.id DESC
        LIMIT 5
      `, [user.id]),
      findOne(`
        SELECT 
          (SELECT COUNT(*) FROM saved_colleges WHERE user_id = $1) as total_saved,
          (SELECT COUNT(*) FROM reviews WHERE user_id = $1) as total_reviews,
          (SELECT COUNT(*) FROM applications WHERE user_id = $1) as total_applications
      `, [user.id])
    ]);

    if (!userProfile) throw new NotFoundError('User profile not found');

    res.json({
      success: true,
      data: {
        user: userProfile,
        saved_colleges: savedColleges,
        statistics: {
          saved_count: parseInt(stats?.total_saved || '0'),
          reviews_count: parseInt(stats?.total_reviews || '0'),
          applications_count: parseInt(stats?.total_applications || '0'),
        }
      }
    });
  } catch (error) {
    next(error);
  }
});

// list saved
router.get('/saved', async (req, res, next) => {
  try {
    // @ts-ignore
    const user = req.user;
    const savedColleges = await findMany(`
      SELECT c.id, c.name, c.location, c.fees, c.rating, c.image_url, sc.id as save_id
      FROM colleges c
      JOIN saved_colleges sc ON c.id = sc.college_id
      WHERE sc.user_id = $1
      ORDER BY c.name ASC
    `, [user.id]);
    res.json({ success: true, data: savedColleges });
  } catch (error) {
    next(error);
  }
});

// save college
router.post('/saved', async (req, res, next) => {
  try {
    // @ts-ignore
    const user = req.user;
    const { collegeId } = await validateData(saveCollegeSchema, req.body);

    const collegeExists = await findOne('SELECT id FROM colleges WHERE id = $1', [collegeId]);
    if (!collegeExists) throw new NotFoundError('College not found');

    const existingSave = await findOne('SELECT id FROM saved_colleges WHERE user_id = $1 AND college_id = $2', [user.id, collegeId]);
    if (existingSave) return res.status(409).json({ success: false, message: 'College already saved' });

    await query('INSERT INTO saved_colleges (user_id, college_id) VALUES ($1, $2)', [user.id, collegeId]);
    res.json({ success: true, message: 'College saved successfully' });
  } catch (error) {
    next(error);
  }
});

// remove saved
router.delete('/saved/:id', async (req, res, next) => {
  try {
    // @ts-ignore
    const user = req.user;
    const { id: collegeId } = await validateData(uuidParamSchema, req.params);

    const existingSave = await findOne('SELECT id FROM saved_colleges WHERE user_id = $1 AND college_id = $2', [user.id, collegeId]);
    if (!existingSave) throw new NotFoundError('College not found in your saved list');

    await query('DELETE FROM saved_colleges WHERE user_id = $1 AND college_id = $2', [user.id, collegeId]);
    res.json({ success: true, message: 'College removed from saved list' });
  } catch (error) {
    next(error);
  }
});

// apply to college
router.post('/apply', async (req, res, next) => {
  try {
    // @ts-ignore
    const user = req.user;
    const { collegeId } = req.body;

    if (!collegeId) return res.status(400).json({ success: false, error: 'College ID is required' });

    const collegeExists = await findOne('SELECT id FROM colleges WHERE id = $1', [collegeId]);
    if (!collegeExists) throw new NotFoundError('College not found');

    const existingApplication = await findOne('SELECT id FROM applications WHERE user_id = $1 AND college_id = $2', [user.id, collegeId]);
    if (existingApplication) return res.status(409).json({ success: false, message: 'Already applied to this college' });

    await query('INSERT INTO applications (user_id, college_id) VALUES ($1, $2)', [user.id, collegeId]);
    res.json({ success: true, message: 'Application submitted successfully' });
  } catch (error) {
    next(error);
  }
});

// update profile
router.put('/profile', async (req, res, next) => {
  try {
    // @ts-ignore
    const user = req.user;
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ success: false, error: 'Name and email are required' });
    }

    const result = await query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING id, name, email',
      [name, email, user.id]
    );

    if (result.rowCount === 0) {
      throw new NotFoundError('User not found');
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    next(error);
  }
});

export default router;

import { Router } from 'express';
import { query, findOne } from '../db/queries';
import { hashPassword, comparePassword, setSession, logout } from '../auth/utils';
import { signupSchema, loginSchema, validateData } from '../validations';
import { AuthenticationError } from '../errors';
import { authMiddleware } from '../auth/withAuth';

const router = Router();

// signup
router.post('/signup', async (req, res, next) => {
  try {
    const data = await validateData(signupSchema, req.body);
    const { name, email, password } = data;

    const existingUser = await findOne('SELECT id FROM users WHERE email = $1', [email]);
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'User with this email already exists' });
    }

    const hashedPassword = await hashPassword(password);
    const result = await query(
      'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, hashedPassword]
    );

    const newUser = result.rows[0];
    await setSession(res, newUser);

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: { user: { id: newUser.id, name: newUser.name, email: newUser.email } }
    });
  } catch (error) {
    next(error);
  }
});

// login
router.post('/login', async (req, res, next) => {
  try {
    const data = await validateData(loginSchema, req.body);
    const { email, password } = data;

    const user = await findOne(
      'SELECT id, name, email, password_hash FROM users WHERE email = $1',
      [email]
    );

    if (!user) throw new AuthenticationError('Invalid email or password');

    const isPasswordValid = await comparePassword(password, user.password_hash);
    if (!isPasswordValid) throw new AuthenticationError('Invalid email or password');

    await setSession(res, { id: user.id, name: user.name, email: user.email });

    res.json({
      success: true,
      message: 'Login successful',
      data: { user: { id: user.id, name: user.name, email: user.email } }
    });
  } catch (error) {
    next(error);
  }
});

// logout
router.post('/logout', async (req, res) => {
  await logout(res);
  res.json({ success: true, message: 'Logged out successfully' });
});

// me
router.get('/me', authMiddleware, (req, res) => {
  // @ts-ignore
  res.json({ success: true, data: { user: req.user } });
});

export default router;

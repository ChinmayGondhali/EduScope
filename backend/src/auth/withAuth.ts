import { Request, Response, NextFunction } from 'express';
import { getSession } from './utils';
import { AuthenticationError } from '../errors';

/**
 * Express middleware to protect routes and inject user session
 */
export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const session = await getSession(req);

    if (!session || !session.user) {
      throw new AuthenticationError('Unauthorized: Please login to access this resource');
    }

    // @ts-ignore
    req.user = session.user;
    next();
  } catch (error) {
    next(error);
  }
}

import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { Response, Request } from 'express';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-dev-only';
const key = new TextEncoder().encode(JWT_SECRET);

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 12);
};

export const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ['HS256'],
  });
  return payload;
}

export async function setSession(res: Response, user: { id: string; email: string; name: string }) {
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
  const session = await encrypt({ user, expires });

  res.cookie('session', session, {
    expires,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });
}

export async function getSession(req: Request) {
  const session = req.cookies?.session;
  if (!session) return null;
  return await decrypt(session);
}

export async function logout(res: Response) {
  res.cookie('session', '', { expires: new Date(0), path: '/' });
}

import { NextResponse, type NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-dev-only';
const key = new TextEncoder().encode(JWT_SECRET);

/**
 * Middleware to protect routes at the edge
 */
export async function middleware(request: NextRequest) {
  const session = request.cookies.get('session')?.value;

  // Define protected path patterns
  const isProtectedPath = 
    request.nextUrl.pathname.startsWith('/api/dashboard') || 
    request.nextUrl.pathname.startsWith('/api/saved') ||
    request.nextUrl.pathname.startsWith('/dashboard');

  if (isProtectedPath) {
    if (!session) {
      // For API routes, return 401 Unauthorized
      if (request.nextUrl.pathname.startsWith('/api/')) {
        return NextResponse.json(
          { success: false, error: 'Unauthorized: No session found' },
          { status: 401 }
        );
      }
      // For page routes, redirect to login
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    try {
      // Verify JWT token
      await jwtVerify(session, key, {
        algorithms: ['HS256'],
      });
      return NextResponse.next();
    } catch (error) {
      console.error('Middleware JWT verification failed:', error);
      
      if (request.nextUrl.pathname.startsWith('/api/')) {
        return NextResponse.json(
          { success: false, error: 'Unauthorized: Invalid session' },
          { status: 401 }
        );
      }
      
      // Clear invalid session and redirect to login
      const response = NextResponse.redirect(new URL('/auth/login', request.url));
      response.cookies.set('session', '', { expires: new Date(0) });
      return response;
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};

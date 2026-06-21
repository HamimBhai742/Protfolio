import { NextRequest } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';

export interface DecodedUser extends JwtPayload {
  userId: number;
  email: string;
  role: string;
}

export class AuthError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = 'AuthError';
  }
}

export async function verifyAuth(request: NextRequest, requiredRole?: string): Promise<DecodedUser> {
  const authHeader = request.headers.get('authorization');
  const cookieToken = request.cookies.get('accessToken')?.value;
  const token = authHeader || cookieToken;

  if (!token) {
    throw new AuthError('Access denied. No token provided.', 403);
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error('JWT_SECRET environment variable is missing.');
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as DecodedUser;

    if (!decoded) {
      throw new AuthError('Unauthorized Access', 401);
    }

    if (requiredRole && decoded.role !== requiredRole) {
      throw new AuthError('You are not authorized', 401);
    }

    if (requiredRole === 'ADMIN' && decoded.role !== 'ADMIN') {
      throw new AuthError('You are not authorized', 401);
    }

    return decoded;
  } catch (err: unknown) {
    if (err instanceof AuthError) {
      throw err;
    }
    const errorMsg = err instanceof Error ? err.message : 'Unauthorized Access';
    if (
      err instanceof Error &&
      (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError')
    ) {
      throw new AuthError('Unauthorized Access', 401);
    }
    throw new AuthError(errorMsg, 401);
  }
}

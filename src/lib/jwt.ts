import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_default_secret'; // Use a strong, random secret in production
const JWT_EXPIRES_IN = '1d';

interface UserPayload {
  id: string;
  email: string;
  username: string;
  role: string;
}

export function generateToken(payload: UserPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string): UserPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as UserPayload;
    return decoded;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
} 
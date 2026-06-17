import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is missing in environment variables');
  }
  return secret;
};

// ขยาย Type ของ Request เพื่อให้เก็บ user ได้
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

// Middleware ยืนยันตัวตนทั่วไป (JWT Verification)
export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
      return;
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = jwt.verify(token, getJwtSecret()) as any;

    // เก็บข้อมูล user ไว้ใน request object เพื่อให้ใช้งานต่อใน controller หรือ middleware ถัดไปได้
    req.user = decoded;

    next();
  } catch (error: any) {
    console.error('💥 Authentication middleware error:', error);
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
      return;
    }
    res.status(500).json({ success: false, message: error.message || 'Internal Server Error during authentication' });
  }
};

// Middleware ตรวจสอบสิทธิ์บทบาทผู้ใช้งาน (Role-Based Access Control)
export const requireRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Unauthorized: Authentication required' });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({ success: false, message: 'Forbidden: Insufficient privileges' });
      return;
    }

    next();
  };
};

// Legacy isAdmin middleware เพื่อไม่ให้ระบบที่เรียกใช้อยู่เดิมพัง
export const isAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  await authenticate(req, res, () => {
    requireRole(['admin'])(req, res, next);
  });
};



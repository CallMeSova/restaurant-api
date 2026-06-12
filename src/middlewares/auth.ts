import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

// ขยาย Type ของ Request เพื่อให้เก็บ user ได้
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const isAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
      return;
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as any;

    // เช็คสิทธิ์ Admin
    if (decoded.role !== 'admin') {
      res.status(403).json({ success: false, message: 'Forbidden: Requires admin privileges' });
      return;
    }

    // เก็บข้อมูล user ไว้ใน request object เพื่อให้ controller นำไปใช้ต่อได้ (ถ้าต้องการ)
    req.user = decoded;

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
      return;
    }
    res.status(500).json({ success: false, message: 'Internal Server Error during authorization' });
  }
};


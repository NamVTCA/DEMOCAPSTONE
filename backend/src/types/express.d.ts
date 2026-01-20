// backend/src/types/express.d.ts
import 'express';

declare global {
  namespace Express {
    interface User {
      userId?: string;
      email?: string;
      roles?: string[];
      sub?: string;
      // thêm các trường bạn dùng khác (ví dụ name, avatar...)
      [key: string]: any;
    }

    interface Request {
      user?: User;
    }
  }
}
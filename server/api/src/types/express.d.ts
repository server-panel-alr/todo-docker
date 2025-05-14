import { User } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
    interface Response {
      error: (options?: { code?: number; message?: string }) => void;
      success: <T>(options?: {
        code?: number;
        message?: string;
        data?: T;
      }) => void;
    }
  }
}

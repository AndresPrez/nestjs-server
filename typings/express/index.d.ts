import Express from 'express';
declare global {
  namespace Express {
    interface Request {
      customProperty?: any;
    }
    interface User {
      [key: string]: string;
    }
  }
}

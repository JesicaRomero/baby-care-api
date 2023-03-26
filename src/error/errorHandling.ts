import type { Request, Response, NextFunction } from 'express';

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    data: null,
    error: {
      statusCode: 404,
      message: 'Not found',
    },
  });
};

export const internalServer = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(500).json({
    data: null,
    error: {
      statusCode: 500,
      message: 'Internal server error',
    },
  });
};

import type { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  process.env.NODE_ENV !== 'production' && console.error(err.stack);
  if (err instanceof Error) {
    if (err.cause) {
      const cause = err.cause as { status: number; code?: string };

      if (cause.code === 'ACCESS_TOKEN_EXPIRED') {
        res.setHeader('WWW-Authenticate', 'Bearer error="token_expired", error_description="the access token expired"');
      }

      res.status(cause.status ?? 500).json({ message: err.message, code: cause.code });
      return;
    }
  }
  res.status(500).json({ message: 'Internal server error' });
  return;
};

export default errorHandler;

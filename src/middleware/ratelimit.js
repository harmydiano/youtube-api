import rateLimit from 'express-rate-limit';
import AppError from '../lib/api/app-error';
import { RATE_LIMIT_MAX, RATE_LIMIT_WINDOW, TOO_MANY_REQUEST } from '../utils/constants';
import lang from '../rest/lang';

  
// Define the rate limiter with custom handler
const rateLimiter = rateLimit({
    windowMs: RATE_LIMIT_WINDOW, // 1 minute
    max: RATE_LIMIT_MAX, // limit each IP to 10 requests per windowMs
    handler: (req, res, next) => {
        // Custom response when rate limit is exceeded
        const appError = new AppError(lang.get('error').rate_limit, TOO_MANY_REQUEST, null);
        return next(appError);
    },
  });
  export default rateLimiter;
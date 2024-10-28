import { Router } from 'express';
import VideoController from './video.controller';
import rateLimiter from '../../middleware/ratelimit';

const router = Router();

const videoCtrl = new VideoController();

router.route('/video')
	.get(rateLimiter, videoCtrl.fetch);
router.route('/video/comments')
	.get(rateLimiter, videoCtrl.comments);

export default router;

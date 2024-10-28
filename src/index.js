import { Router } from 'express';

import video from './rest/video/video.route';

const router = Router();

router.use(video);

export default router;

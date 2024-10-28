import _ from 'lodash';
import { BAD_REQUEST, OK } from '../../utils/constants';
import AppError from '../../lib/api/app-error';
import VideoProcessor from './video.processor';
import VideoValidation from './video.validation';
import youtube from '../../lib/api/youtube';
import lang from '../lang';

/**
 *  VideoController
 */
class VideoController {

	/**
	 * @param {Object} req The request object
	 * @param {Object} res The response object
	 * @param {Function} next The callback to the next program handler
	 * @return {Object} res The response object
	 */
	async fetch(req, res, next) {
        const obj = req.query;		
		try {
            const validator = await VideoValidation.fetch(obj);
			if (!validator.passed) {
				return next(
					new AppError(lang.get('error').inputs, BAD_REQUEST, validator.errors)
				);
			}
            const videoDetails = await youtube.fetchVideoDetails(obj?.videoId);
			if (videoDetails) {
				const response = await VideoProcessor.getResponse({
					code: OK,
					value: videoDetails,
				});
				return res.status(OK).json(response);
			}
			const appError = new AppError(lang.get(error).not_found, BAD_REQUEST);
			return next(appError);
		} catch (err) {
			return next(err);
		}
	}

    /**
	 * @param {Object} req The request object
	 * @param {Object} res The response object
	 * @param {Function} next The callback to the next program handler
	 * @return {Object} res The response object
	 */
	async comments(req, res, next) {
        const obj = req.query;
		try {
            const validator = await VideoValidation.comment(obj);
			if (!validator.passed) {
				return next(
					new AppError(lang.get('error').inputs, BAD_REQUEST, validator.errors)
				);
			}
            const { videoId, pageToken } = obj;
            const videoComments = await youtube.fetchComments(videoId, pageToken);
			if (videoComments) {
				const response = await VideoProcessor.getResponse({
					code: OK,
					value: videoComments,
				});
				return res.status(OK).json(response);
			}
			const appError = new AppError(lang.get(error).not_found, BAD_REQUEST);
			return next(appError);
		} catch (err) {
			return next(err);
		}
	}
}

export default VideoController;

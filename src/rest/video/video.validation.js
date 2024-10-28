import _ from 'lodash';
import * as Joi from 'joi';
import config from 'config';
import AppError from '../../lib/api/app-error';

/**
 * The Video Validation class
 */
class VideoValidation {
	/**
	 * @param {Object} body The object to validate
	 * @return {Object} Validator
	 */
	async fetch(body = {}) {
		const schema = Joi.object({
			videoId: Joi.string()
				.required(),
		}).options({ abortEarly: false });
		const validate = await schema.validate(body, config.get('options'));
		return AppError.formatInputError(validate);
	}
    /**
	 * @param {Object} body The object to validate
	 * @return {Object} Validator
	 */
	async comment(body = {}) {
		const schema = Joi.object({
			videoId: Joi.string()
				.required(),
            pageToken: Joi.string()
			.optional(),
		}).options({ abortEarly: false });
		const validate = await schema.validate(body, config.get('options'));
		return AppError.formatInputError(validate);
	}
}

export default new VideoValidation();

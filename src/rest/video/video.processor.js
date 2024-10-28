import _ from 'lodash';
import AppResponse from "../../lib/api/app-response";
/**
 * The VideoProcessor class
 */
class VideoProcessor {
    /**
	 * @param {Object} options required for response
	 * @return {Promise<Object>}
	 */
	static async getResponse({ value, code, message}) {
		try {
			const meta = AppResponse.getSuccessMeta();
			_.extend(meta, { status_code: code });
			if (message) {
				meta.message = message;
			}
			return AppResponse.format(meta, value);
		} catch (e) {
			throw e;
		}
	}
}
export default VideoProcessor;
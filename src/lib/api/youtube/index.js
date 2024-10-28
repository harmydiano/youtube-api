import config from 'config';
import _ from 'lodash';
import ApiService from "../../app-request";
import logger from '../../../utils/logging';
import lang from '../../../rest/lang';
/**
 * The Youtube Api Class
 */
class Youtube {
     /**
     * The constructior
     * initializes the required configs
     * for the youtube API
     */
     constructor() {
        this.api = ApiService.init(config.get('youtube.url'));
        this.apiUrls = config.get('youtube.apis');
        this.apiKey = config.get('youtube.key');
     }
    /**
	 * @param {String} videoId
	 * @return {Object} returns video details
	 */
    async fetchVideoDetails(videoId) {
        try {
            const response = await this.api.get(this.apiUrls.video, {
            params: {
                id: videoId,
                part: 'snippet,statistics',
                key: this.apiKey,
            },
            });
            console.log(response)
            const video = _.head(response?.data?.items);
            return {
                title: video.snippet.title,
                description: video.snippet.description,
                viewCount: video.statistics.viewCount,
                likeCount: video.statistics.likeCount,
            };
        } catch (error) {
            logger.error(`${lang.get('error').video_failed}: ${error.message}`);
            throw error;
        }
    }

     /**
	 * @param {String} videoId
     * @param {String} nextPageToken
	 * @return {Object} returns video comments
	 */
    async fetchComments(videoId, nextPageToken = '') {
        try {
            console.log(videoId, nextPageToken);
            const request = await this.api.get(this.apiUrls.comments, {
              params: {
                videoId,
                part: 'snippet',
                maxResults: config.get('api.pagination.itemsPerPage'),
                pageToken: nextPageToken,
                key: this.apiKey,
              },
            });
    
            const { items, nextPageToken: newToken } = request.data;
            const comments = items.map(item => ({
                author: item.snippet.topLevelComment.snippet.authorDisplayName,
                comment: item.snippet.topLevelComment.snippet.textDisplay,
                likeCount: item.snippet.topLevelComment.snippet.likeCount,
              }));
            return {comments, newToken}; 
        } catch (error) {
          logger.error(`${lang.get('error').comments_failed}: ${error.message}`);
          throw error;
        }
    }
}
export default new Youtube()
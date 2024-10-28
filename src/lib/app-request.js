import axios from 'axios';
import interceptor from './axios-error-handler';
/** API Service classs */
class ApiService {
    /**
     * @param {string} baseUrl
     * @return {Object}
     */
    static init(baseUrl) {
		let defaultOptions = {
			baseURL: baseUrl,
			headers: this.setHeader(),
		};
		let instance = axios.create(defaultOptions);
		interceptor.requestInterceptor(instance);
		interceptor.responseInterceptor(instance);
		return instance;
    }
	/**
	 * @function
	 * @return {Object} The header object
	 */
    static setHeader() {
        let auth = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36',
            'Content-Type': 'application/json'
        };
        return auth;
    }
}
export default ApiService;

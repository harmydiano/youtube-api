import lang from '../rest/lang'
import { UNPROCESSABLE } from '../utils/constants';
const interceptor = {
    requestInterceptor(axios) {
        axios.interceptors.request.use(
            function(config) {
                // loader;
                return config;
            },
            function(error) {
                // Do something with request error
                return Promise.reject(error);
            }
        );
    },

    responseInterceptor(axios) {
        // Add a response interceptor
        axios.interceptors.response.use(
            response => {
                // console.log('axios response', response);
                // Do something with response data
                return response || response.data || response.data.data;
            },
            error => {
                if (error.response) {
                    const status = error.response.status;
                    const errorMessage = error.response.data.error?.message || 'An unknown error occurred with the YouTube API';
                    if (error.response.data) {
                        return Promise.reject({ statusCode: status, statusText: errorMessage });
                    }
                } else if (error.request) {
                    console.log('request error');
                    return Promise.reject({ statusCode: UNPROCESSABLE, statusText: lang.get('error').network });
                }
            }
        );
    }
};

export default interceptor;

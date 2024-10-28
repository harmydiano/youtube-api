require('dotenv').config();
const PORT = process.env.PORT || 3010;
module.exports = {
    app: {
        appName: process.env.APP_NAME || 'Youtube-API',
        environment: process.env.NODE_ENV || 'dev',
        baseUrl: `http://localhost:${PORT}`,
        siteUrl: `http://127.0.0.1:${PORT}/api/v1/`,
        port: PORT,
    },
    api: {
        lang: 'en',
        prefix: '^/api/v[1-9]',
		resource: '^/resources/[a-zA-Z-]+',
        versions: [1],
        pagination: {
            itemsPerPage: 100
        }
    },
    options: {
        errors: {
            wrap: { label: '' }
        }
    },
	youtube: {
		url: process.env.YOUTUBE_API_URL,
        key: process.env.YOUTUBE_API_KEY,
        apis: {
            video: '/videos',
            comments: '/commentThreads'
        }
	},
}
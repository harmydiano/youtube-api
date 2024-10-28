import config from 'config';
import errorHandler from './middleware/errors';

import Q from 'q';
import { NOT_FOUND } from './utils/constants';
import AppError from './lib/api/app-error';
import apiV1 from './index';

const prefix = config.get('api.prefix') || '/api/v1';

/**
 * The routes will add all the application defined routes
 * @param {app} app The main is an instance of an express application
 * @return {Promise<void>}
 */
export default async (app) => {
	// Route to serve index.html at the root URL
	app.get('/', (req, res) => {
		res.sendFile(path.join(__dirname, '../public/index.html'));
	})
	// load version 1 routes
	app.use(prefix, apiV1);
	// check if url contains empty request
	app.use('*', (req, res, next) => {
		return next(new AppError('not found', NOT_FOUND));
	});
	// load the error middleware
	app.use(errorHandler);
	return Q.resolve(app);
};

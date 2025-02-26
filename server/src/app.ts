import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import userAgent from 'express-useragent';
dotenv.config();

import authRouter from './routes/auth';
import studentRouter from './routes/student';
import userRouter from './routes/user';
import transactionRouter from './routes/transaction';
import categoryRouter from './routes/category';
import organizationRouter from './routes/organization';

import { NODE_ENV, PORT } from './constants/env';
import { notFoundHandler } from './middlewares/not-found';
import { errorHandler } from './middlewares/error';
import { auth } from './middlewares/authentication/auth';
import { healthcheck } from './middlewares/healthcheck';
import { corsOptions } from './utils/cors';
import {
	attachDatabaseModels,
	attachOriginalDatabaseModels,
} from './middlewares/attach-database-models';

const app = express();
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(userAgent.express());
app.set('trust proxy', true);
app.get('/', healthcheck);

// Attach global database models to the request object
app.use(attachOriginalDatabaseModels);
app.use('/auth', authRouter);

// All routes from here requires the user to be authenticated
app.use(auth);
app.use(attachDatabaseModels); // Attach dynamic database models to the request object
app.use('/student', studentRouter);
app.use('/user', userRouter);
app.use('/transaction', transactionRouter);
app.use('/category', categoryRouter);
app.use('/organization', organizationRouter);

// Error handlers
app.use(notFoundHandler);
app.use(errorHandler);

export default app;

if (NODE_ENV !== 'test') {
	app.listen(Number(PORT), '0.0.0.0', () =>
		console.log(`Server is running on http://localhost:${PORT}`)
	);
}

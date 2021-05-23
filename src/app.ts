import cookieParser from 'cookie-parser';
import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { port, urlClient } from './config/config';

// Import Routers
import authRouters from './routers/auth.router';
import userRouters from './routers/user.router';

// Initializations
const app: Application = express();

// Settings
app.set('port', port);

// Middlewares
app.use(morgan('dev'));
app.use(cors({ credentials: true, origin: urlClient }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// Routers
app.use('/api/auth', authRouters);
app.use('/api/user', userRouters);

export default app;

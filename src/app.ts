import cookieParser from 'cookie-parser';
import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { port, urlClient } from './config/config';

// Routes
import authRouters from './routers/auth.router';

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

// Routes
app.use('/api/auth', authRouters);

export default app;

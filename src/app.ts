import cookieParser from 'cookie-parser';
import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { config } from 'dotenv';

// Routes

// Initializations
config();
const app: Application = express();

// Settings
app.set('port', process.env.PORT || 4000);

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(cookieParser());
// Routes

export default app;

import { fileURLToPath } from 'url';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import authFactory from './routes/auth/auth.service.js';

import initializeRoutes from './routes.js';

dotenv.config();
const auth = authFactory();


const app = express();

const __filename = fileURLToPath(import.meta.url);

// Get the current directory's path
const __dirname = path.dirname(__filename);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const allowedOrigins = [
  'http://localhost:3000',
];

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.options('/', cors({ origin: allowedOrigins, credentials: true }));

app.use(auth.initialize());
app.use(logger('dev'));
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));

// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }));

app.use(cookieParser(process.env.SECRET_KEY));

app.use(express.static(path.join(__dirname, 'public')));


initializeRoutes(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('404 - Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res) {
  console.log('Error:', err);

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // return the error as JSON
  res.status(err.status || 500).json({
    code: err.status || 500,
    message: err.message || 'Internal Server Error'
  });
});

export default app;

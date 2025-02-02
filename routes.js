import authRouter from './routes/auth/index.js';


export default function (app) {
  app.use('/auth', authRouter);
};
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import i18next from 'i18next';
import middleware from 'i18next-http-middleware';
import { configureI18n } from './config';
import { responseStatus } from './middlewares';
import { todosRoutes, usersRoutes } from './routes';

dotenv.config();
configureI18n();

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));
app.use(helmet());
app.use(middleware.handle(i18next));
app.use(responseStatus);
app.use('/users', usersRoutes);
app.use('/todos', todosRoutes);

app.listen(port, () => {
  console.log(`api running on port ${port}`);
});

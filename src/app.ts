import express from 'express';
import cors from 'cors';

import routes from './routes/index';
import { notFound, internalServer } from './error/errorHandling';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(routes);
app.use(notFound);
app.use(internalServer);

export default app;

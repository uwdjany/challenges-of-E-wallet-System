import express from 'express';
import cors from 'cors';
import connectDb from './database/dbConnect';
import routes from './routes';

const app = express();
connectDb();
app.use(express.json());
app.enable('trust proxy');
app.use(cors());

app.use('/api', routes);

export default app;

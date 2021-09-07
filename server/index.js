import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import noteRoutes from './routes/notes.js';
import userRouter from './routes/user.js';

dotenv.config();
const app = express();
app.use(cors());

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

// where apis records are stored, 2nd arg under routes folder
app.use('/notes', noteRoutes);
app.use('/user', userRouter);

const CONNECTION_URL = process.env.MONGO_DB_URI;
const PORT = process.env.PORT|| 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);
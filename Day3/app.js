import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/user.routes.js';
import messageRouter from './routes/message.routes.js';
import connectDB from './config/db.js';

dotenv.config();

const app = express();
connectDB();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.use('/user', userRouter);
app.use('/message', messageRouter);

const port = process.env.PORT || 3000;
const url = process.env.URL || 'http://localhost';

app.listen(process.env.PORT, console.log(`Server running at ${url}:${port}/`));

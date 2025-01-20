import express from 'express';
import cors from 'cors';
import router from './routes.js';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.use('/', router);

app.listen(5124, console.log('Server running at http://localhost:5124/'));

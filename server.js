import express from 'express';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

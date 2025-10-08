
import express from 'express'
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler.js';
dotenv.config();
const app = express()
const port = 3000



app.use(errorHandler);

app.listen(port, () => {
  console.log(` Server running on port ${port}`);
});

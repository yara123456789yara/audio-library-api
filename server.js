
require("dotenv").config(); 
const express = require("express");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const port = process.env.PORT || 3000;


// test the global error handler
app.get("/test-error", (req, res, next) => {
  const err = new Error(" Something went wrong!");
  err.statusCode = 400;
  next(err);
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(` Server running on port ${port}`);
});

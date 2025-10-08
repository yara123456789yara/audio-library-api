const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const { dbConnections } = require("./database/dbConnection.js");
const router = require("./src/modules/admin/admin.routes.js");

require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
dbConnections();
app.use(router);

app.get("/test-error", (req, res, next) => {
  const err = new Error("Something went wrong!");
  err.statusCode = 400;
  next(err);
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

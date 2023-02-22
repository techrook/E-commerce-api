require("dotenv").config();
const express = require("express");

const rootMiddleware = require("./middleware");
const rootRouter = require("./routes");

const app = express();

// connect database
require("./config/db").connect();

// middleware
app.use(rootMiddleware);

// routes
app.use("api/v1/", rootRouter);

const port = process.env.PORT || 3023;

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

require("dotenv").config();
const express = require("express");
const cors = require("cors")

const rootMiddleware = require("./middleware");
const rootRouter = require("./routes");   

const app = express();

app.use(cors())

// connect database
require("./DB/db").connect();

// middleware
app.use(rootMiddleware);

// routes
app.use("/api/v1/", rootRouter);

const port = process.env.PORT || 3023;

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

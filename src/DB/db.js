// @ts-nocheck
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);

const connect = () => {    
  mongoose.connect(process.env.MONGODB_URL);

  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB Successfully To http://localhost:3023/");
  });

  mongoose.connection.on("error", (err) => {
    console.log("An error occurred while connecting to MongoDB");
    console.log(err);
  });
};

module.exports = { connect };


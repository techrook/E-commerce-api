const { Router } = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const rootMiddleware = Router();

// parse application/x-www-form-urlencoded
rootMiddleware.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
rootMiddleware.use(bodyParser.json());
// Enable All CORS Requests
rootMiddleware.use(cors());
rootMiddleware.use(express.json());

module.exports = rootMiddleware;

const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.listen(port,  (req, res, next)=> {
    console.log(`server running on port ${port}`);
})
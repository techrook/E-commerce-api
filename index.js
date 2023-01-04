const { request } = require('express');
const express = require('express');
require('dotenv').config();
require('./DB/db').connect();

const app = express();
const UserRouter = require('./routes/user-routes')
const AdminRouter = require('./routes/admin-routes')

app.use('/api/user',UserRouter)
app.use('/api/admin',AdminRouter)


const port = process.env.PORT || 3023;





app.listen(port,  (req, res, next)=> {
    console.log(`server running on port ${port}`);
})
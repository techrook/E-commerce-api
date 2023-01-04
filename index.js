// const { request } = require('express');

//build dependencies
const express = require('express');
require('dotenv').config();

//connect database
require('./DB/db').connect();

//local dependencies
const UserRouter = require('./routes/user-routes');
const AdminRouter = require('./routes/admin-routes');
const productRouter = require('./routes/product.routes');
const cartRouter = require('./routes/cart.routes');
const categoryRouter = require('./routes/category.routes');

// routes
app.use('/user',UserRouter);
app.use('/admin',AdminRouter);
app.use('/products', productRouter);
app.use('/cart', cartRouter);
app.use('/category', categoryRouter);

const app = express();
const port = process.env.PORT || 3023;





app.listen(port,  (req, res, next)=> {
    console.log(`server running on port ${port}`);
})
//build dependencies
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//connect database
require('./DB/db').connect();

//local dependencies
const userRouter = require('./routes/user.routes');
const adminRouter = require('./routes/admin.routes');
const productRouter = require('./routes/product.routes');
const cartRouter = require('./routes/cart.routes');
const categoryRouter = require('./routes/category.routes');

app.use(express.json())

// routes
app.use('/user',userRouter);
app.use('/admin',adminRouter);
app.use('/products', productRouter);
app.use('/cart', cartRouter);
app.use('/category', categoryRouter);

const port = process.env.PORT || 3023;





app.listen(port,  (req, res, next)=> {
    console.log(`server running on port ${port}`);
})
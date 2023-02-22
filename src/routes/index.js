const { Router } = require("express");

const userRouter = require("./user.routes");
const adminRouter = require("./admin.routes");
const productRouter = require("./product.routes");
const cartRouter = require("./cart.routes");
const categoryRouter = require("./category.routes");

const rootRouter = Router();

// routes
rootRouter.use("/user", userRouter);
rootRouter.use("/admin", adminRouter);
rootRouter.use("/products", productRouter);
rootRouter.use("/cart", cartRouter);
rootRouter.use("/category", categoryRouter);

app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + " not found" });
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  const status = err.status || 500;

  res.status(status);
  res.render("error");
});

module.exports = rootRouter;

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv/config");


const mongoose = require("mongoose");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth.routes");
const menuRouter = require("./routes/menu.routes");
const customRouter = require("./routes/custom.routes");
const orderRouter = require("./routes/orders/order.routes");
const checkoutRouter = require("./routes/checkout.routes");

const cors = require("cors");

const app = express();

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/backend-api")
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN || "http://localhost:3000",
  })
);

const session = require("express-session");
const passport = require("passport");

// Passport initial setup
require("./config/passport");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(
  session({
    secret: "some secret goes here",
    resave: true,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/orders", orderRouter);
app.use("/menu", menuRouter);
app.use("/custom", customRouter);
app.use("/checkout", checkoutRouter);


// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

module.exports = app;

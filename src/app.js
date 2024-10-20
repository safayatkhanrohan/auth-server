require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const connectDB = require("./config/dbConfig");
const userRouter = require("./routes/userRouter");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();

connectDB();

app.use(
  cors({
    origin: "https://auth-client-ashen.vercel.app/",
    // origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//routes
app.use(userRouter);

app.use(errorHandler);

module.exports = app;

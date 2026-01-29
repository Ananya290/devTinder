const express = require("express");
const connectDB = require("./config/database");
const User = require("./Model/user");
// const { ValidatorSignup } = require("./utils/validators");
// const bcrypt = require("bcrypt");
const cookieparser = require("cookie-parser");
const jwt = require("jsonwebtoken");
// const { userAuth } = require("./middleware/auth")
const cors = require("cors");

const app = express();
app.use(cors({
  credentials: true,
  origin: "http://localhost:4200"
}));
app.use(express.json());
app.use(cookieparser());

const userRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const UserRouter = require("./routes/user");

app.use("/", userRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", UserRouter);








connectDB()
  .then(() => {
    console.log("database connection done succesfully");
    app.listen(7000, () => {
      console.log("server start....");
    });
  })
  .catch(() => {
    console.log("connection not done succesfully");
  });

const express = require("express");
const connectDB = require("./config/database");
const User = require("./Model/user");
const { ValidatorSignup } = require("./utils/validators");
const bcrypt = require("bcrypt");
const cookieparser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middleware/auth")

const app = express();

app.use(express.json());
app.use(cookieparser());
app.post("/signUp", async (req, res) => {
  try {
    ValidatorSignup(req); //validation function call ye jaruri hai don't accept invalid data
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);
    const userObj = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await userObj.save();
    res.status(201).json({ message: "user signed up successfully" });
  } catch (err) {
    res.status(404).json(err.message, "user signup failed !!");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });
    if (!user) {
      return res.status(404).json("user not found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json("Invalid credentials");
    }
    const token = await jwt.sign({ _id: user._id }, "DevTinder@1945");
    res.cookie("token", token);
    res.status(200).json("Login successful");
  } catch (err) {
    res.status(500).json("Login failed: " + err.message);
  }
});

app.get("/profile",userAuth, async (req, res) => {
  try {
    const user = req.user
    res.send(user)
  } catch (err) {
    res.send("Error");
  }
});

// app.get("/getApi", async (req, res) => {
//   const useremail = req.body.emailId;
//   console.log(useremail);

//   const user = await User.find({ emailId: useremail });
//   if (user.length === 0) {
//     res.status(404).send("User not found");
//   }
//   {
//     res.send(user);
//   }
// });

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

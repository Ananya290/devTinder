const express = require("express");
const { userAuth } = require("../middleware/auth");
const {
  ValidateAllowedFeildData,
  ValidatePassordChangeData
} = require("../utils/validators");
const { user } = require("../Model/user");
const profileAuth = express.Router();
const bcrypt = require("bcrypt")

profileAuth.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.send("Error");
  }
});

profileAuth.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!ValidateAllowedFeildData(req)) {
      throw new Error("Field is not allowed to edit");
    }
    const loggedInUser = req.user;
    const updates = Object.keys(req.body);
    updates.forEach((update) => {
      loggedInUser[update] = req.body[update];
    });
    await loggedInUser.save();
    res.status(200).send(loggedInUser);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

profileAuth.patch("/profile/changePassword", userAuth, async (req, res) => {
  try {
    if (!ValidatePassordChangeData(req)) {
      throw new Error("Field can't be Change");
    }
    const loggedInUser = req.user;
    const { oldpassword, newPassword } = req.body;

    const isPasswordValid =  await loggedInUser.verifyPassword(oldpassword);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Old password is incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    loggedInUser.password = hashedPassword;
    await loggedInUser.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

module.exports = profileAuth;

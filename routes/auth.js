import express from "express";
import User from "../models/User.js";
const router = express.Router();
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

//Register
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
  });
  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Login
router.post("/logins", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(401).json("Wrong credentials!!");
    } else {
      const hashedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.SECRET_KEY
      );
      const passwords = hashedPassword.toString(CryptoJS.enc.Utf8);
      if (passwords !== req.body.password) {
        res.status(401).json("Wrong credentials!!");
      } else {
        const accessToken = jwt.sign(
          {
            id: user._id,
            isAdmin: user.isAdmin,
          },
          process.env.JWT,
          { expiresIn: "1d" }
        );
        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, accessToken });
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;

import { Signup, Login, Logout,userVerification } from "../Controllers/AuthController.js";
import { User } from "../Models/UserModel.js";
import express from "express";
const router = express.Router({ caseSensitive: true, strict: true });

router
  .post("/", userVerification)
  .post("/signup", Signup)
  .post("/login", Login)
  .post("/logout", Logout)
  .get("/check-username", async (req, res) => {
    const { username } = req.query;

    const user = await User.findOne({ username });

    return res.json({
      available: !user,
    });
  });

export { router };

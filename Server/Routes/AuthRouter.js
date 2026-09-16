import { Signup, Login, Logout } from "../Controllers/AuthController.js";
import express from "express";
import { userVerification } from "../Middlewares/AuthMiddleware.js";
const router = express.Router({ caseSensitive: true, strict: true });

router
  .post("/", userVerification)
  .post("/signup", Signup)
  .post("/login", Login)
  .post("/logout", Logout);

export { router };

import bcrypt from "bcrypt";
import { User } from "../Models/UserModel.js";
import { createSecretToken } from "../Utils/SecretToken.js";

const Signup = async (req, res) => {
  try {
    const { email, password, username, createdAt } = req.body;

    if (!email || !password || !username) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required!" });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res
        .status(401)
        .json({ message: "User Alredy Exists!", success: false });
    }

    const user = await User.create({ email, username, password, createdAt });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      sameSite: "lax",
      httpOnly: true,
    });

    return res
      .status(200)
      .json({ message: "User Signed successfully", success: true });
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .json({ message: "Something went wrong!", success: false });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required!", success: false });
    }

    const user = await User.findOne({ $or: [{ email }] });

    if (!user)
      return res
        .status(401)
        .json({ message: "Incorrect password or email", success: false });

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res
        .status(401)
        .json({ message: "Incorrect password or email", success: false });
    }

    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      sameSite: "lax",
      httpOnly: true,
    });

    return res
      .status(200)
      .json({ message: "User logged in successfully", success: true });
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .json({ message: "Something went wrong!", success: false });
  }
};

const Logout = (req, res) => {
  res.clearCookie("token", { sameSite: "lax", httpOnly: true });

  return res
    .status(200)
    .json({ message: "Logged Out Successfull", success: true });
};

export { Signup, Login,Logout };

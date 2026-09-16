import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Your Email Address is Required!"],
  },
  username: {
    type: String,
    unique: [true,"Username must be unique"],
    required: [true, "Your Username is Required!"],
  },
  password: {
    type: String,
    required: [true, "Your Password is Required!"],
  },

  createdAt: {
    type: Date,
    default: new Date(),
  },
});

userSchema.pre("save", async function() {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

const User = model("User", userSchema);

export { User };

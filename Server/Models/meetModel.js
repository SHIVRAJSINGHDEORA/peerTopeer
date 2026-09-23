import mongoose, { Schema, model } from "mongoose";
import crypto from "node:crypto";

const meetSchema = new Schema({
  meetId: {
    type: String,
    unique: true,
    required: true,
    default: () => {
      return crypto.randomBytes(6).toString("hex");
    },
  },
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Meet = model("Meet", meetSchema);

export { Meet };

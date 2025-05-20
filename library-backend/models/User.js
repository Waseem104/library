import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "author"],
      required: true,
      default: "user",
    },
    memberSince: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);
const userModel = mongoose.model("User", UserSchema);
export default userModel;

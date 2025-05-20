// external modules
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// internal modules
import User from "../models/User.js";
import { handleError } from "../helper/handleError.js";

dotenv.config();

export const registerController = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User Already Exist,Please Login", success: true });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await new User({
      name,
      email,
      password: hashedPassword,
      role,
    }).save();

    // generate token
    const token = jwt.sign(
      {
        id: newUser._id,
        email: newUser.email,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d", algorithm: "HS256" }
    );
    return res.status(201).json({
      message: "Registered Successfully",
      success: true,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
      token: token,
    });
  } catch (error) {
    return handleError(res, error, "registerController");
  }
};

// login controller
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user exist
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(401)
        .json({ message: "User Not exist,please Register", success: false });
    }

    // compare password
    const isMatched = await bcrypt.compare(password, existingUser.password);
    if (!isMatched) {
      return res.send(200).json({
        message: "Invalid Credentials",
        success: false,
      });
    }

    // generate token
    const token = jwt.sign(
      { id: existingUser._id, email: existingUser.email },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
        algorithm: "HS256",
      }
    );
    return res.status(200).json({
      message: "Login Successful",
      success: true,
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
      },
      token: token,
    });
  } catch (error) {
    return handleError(res, error, "loginController");
  }
};

// getCurrentUser controller
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (err) {
    return handleError(res, error, "getCurrentUser");
  }
};

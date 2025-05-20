import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../models/User.js";

dotenv.config();

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({
        message: "Authorization token missing or malformed",
        success: false,
      });
    }

    // extract token from bearer token
    const token = authHeader.split(" ")[1];

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Fetch User from DB(optional but recommended for role/permission-based access system)

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res
        .status(401)
        .json({ message: "User not found", success: false });
    }

    // attach user to request
    req.user = user;
    next();
  } catch (error) {
    // console.log("Error in authMiddleware: ", error.message);
    return res
      .status(401)
      .json({ message: "Invalid or expired token", success: false });
  }
};

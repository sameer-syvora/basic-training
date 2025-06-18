import jwt from "jsonwebtoken";
import { User } from "../models/watchlistModel.js";

export const checkToken = async (req, res, next) => {
  const tokenHeader = req.headers.authorization;

  if (!tokenHeader || !tokenHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Signup Or Login" });
  }

  const token = tokenHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWTSECRETCODE);
    req.user = await User.findByPk(decoded.id);
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(404).json({ message: "Page Not Found" });
  }
  next();
};
import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { login, signup } from "../controllers/authController.js";
import '../config/passport.js';

const authRouter = express.Router();

const generateToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username }, process.env.JWTSECRETCODE, {
        expiresIn: "1d"
    });
};

authRouter.route("/signup").post(signup);
authRouter.route("/login").post(login);

authRouter.route("/google")
  .get(passport.authenticate("google", { scope: ["profile", "email"], session: false }));

authRouter.route("/google/callback")
  .get(
    passport.authenticate("google", { session: false, failureRedirect: "/" }),
    (req, res) => {
      const token = generateToken(req.user);
      res.json({ token, message: "Google login successful" });
    }
  );

authRouter.route("/facebook")
  .get(passport.authenticate("facebook", { scope: ["email"], session: false }));

authRouter.route("/facebook/callback")
  .get(
    passport.authenticate("facebook", { session: false, failureRedirect: "/" }),
    (req, res) => {
      const token = generateToken(req.user);
      res.json({ token, message: "Facebook login successful" });
    }
  );

export default authRouter;

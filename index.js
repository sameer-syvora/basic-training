import express from "express";
import "dotenv/config";
import passport from "passport";
import sequelize from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import contentRouter from "./routes/contentRoutes.js";
import { checkToken } from "./middlewares/authMiddleware.js";
import "./config/passport.js";

 const app = express();

app.use(express.json());

app.use(passport.initialize());

app.route("/")
  .get((req, res) => {
    res.send("Hello");
  });

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/admin", adminRouter);
app.use("/content", contentRouter);      
app.use("/user/content", checkToken, contentRouter);

app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
app.get("/auth/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET);
    res.json({ token });
  }
);

await sequelize.sync({ force: true });

const PORT = 8000;
const HOST = "localhost";

app.listen(PORT, HOST, () => {
  console.log("Server is running");
});

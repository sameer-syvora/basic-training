import express from "express";
import 'dotenv/config';
import authRouter from "./routes/authRoutes.js";
import friendRouter from "./routes/friendRoutes.js";
import postRouter from "./routes/postRoutes.js";
import { sequelize } from "./models/associations.js";
import { checkToken } from "./middlewares/authMiddleware.js";

const app = express();

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/friends", checkToken, friendRouter);
app.use("/api/posts", checkToken, postRouter);

await sequelize.sync({ force: true });

const PORT = 8000;
const HOST = 'localhost';

app.listen(PORT, HOST, () => {
    console.log("Server is running");
});

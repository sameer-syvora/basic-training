import express from "express";
import { checkToken } from "../middlewares/authMiddleware.js";
import { addToWatchlist, getWatchlist, subscribe } from "../controllers/userController.js";
const router = express.Router();

router.route("/watchlist")
    .get(checkToken, getWatchlist)
    .post(checkToken, addToWatchlist);

router.route("/subscribe")
    .post(checkToken, subscribe);

export default router;

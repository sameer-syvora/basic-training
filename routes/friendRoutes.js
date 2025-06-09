import express from "express";
import { sendFriendRequest, respondToRequest } from "../controllers/friendController.js";

const router = express.Router();

router.route("/request/:recipientId")
    .post(sendFriendRequest);

router.route("/respond/:requestId")
    .post(respondToRequest);

export default router;

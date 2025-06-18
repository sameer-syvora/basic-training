import express from "express";
import { checkToken, isAdmin } from "../middlewares/authMiddleware.js";
import { addContent } from "../controllers/adminController.js";
const router = express.Router();

router.route("/content")
  .post(checkToken, isAdmin, addContent);

export default router;
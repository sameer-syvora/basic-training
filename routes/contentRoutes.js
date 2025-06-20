import express from "express";
import { listAllContent, listGenreContent } from "../controllers/contentController.js";
const router = express.Router();

router.route("/")
    .get(listAllContent);

router.route("/:genre")
    .get(listGenreContent);

export default router;

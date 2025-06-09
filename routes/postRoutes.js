import express from "express";
import { createPost, likePost, listPosts } from "../controllers/postController.js";

const router = express.Router();

router.route("/")
    .get(listPosts)   
    .post(createPost);   

router.route("/:postID/like")
    .post(likePost);    

export default router;

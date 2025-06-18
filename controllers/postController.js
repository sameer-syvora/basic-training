import { Post, Like, User, Friend } from "../models/associations.js";
import { Op } from "sequelize";

export const createPost = async (req, res) => {
    const { content } = req.body;
    const userID = req.user.id;

    if (!content) {
        return res.status(400).json({ message: "Post content required" });
    }

    try {
        const post = await Post.create({ content, userID });
        return res.status(201).json({ message: "Post created", post });
    } 
    catch (error) {
        return res.status(500).json({ message: "Failed to create post" });
    }
};

export const likePost = async (req, res) => {
    const userID = req.user.id;
    const postID = req.params.postID;

    try {
        const alreadyLiked = await Like.findOne({
            where: { userID, postID }
        });

        if (alreadyLiked) {
            return res.status(409).json({ message: "You already liked this post" });
        }

        const like = await Like.create({ userID, postID });
        return res.status(201).json({ message: "Post liked", like });
    } 
    catch (error) {
        return res.status(500).json({ message: "Failed to like post" });
    }
};

export const listPosts = async (req, res) => {
    const userID = req.user.id;

    try {
        const friendships = await Friend.findAll({
            where: {
                status: "Accepted",
                [Op.or]: [
                    { senderID: userID },
                    { recipientID: userID }
                ]
            }
        });

        const friendIDs = friendships.map(friend => {
            return friend.senderID === userID ? friend.recipientID : friend.senderID;
        });

        friendIDs.push(userID);

        const posts = await Post.findAll({
            where: { userID: friendIDs },
            include: [
                {
                    model: User,
                    attributes: ["username"]
                },
                {
                    model: User,
                    as: "usersLiked",
                    attributes: ["id", "username"],
                    through: { attributes: [] }
                }
            ],
            order: [["createdAt", "DESC"]]
        });

        const result = posts.map(post => ({
            id: post.id,
            content: post.content,
            author: post.User.username,
            likeCount: post.usersLiked.length,
            likedBy: post.usersLiked.map(user => user.username),
            createdAt: post.createdAt
        }));

        return res.json(result);
    } 
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to fetch posts" });
    }
};

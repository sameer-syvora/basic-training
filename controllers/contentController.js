import { Content } from "../models/watchlistModel.js";
import { Op } from "sequelize";

export const filterContentData = (contents, req) => {
    const isUserRequest = req.baseUrl.startsWith("/users");
    const isSubscribed =
        req.user?.subscriptionEnd &&
        new Date(req.user.subscriptionEnd) > new Date();

    if (isUserRequest && isSubscribed) return contents;

    return contents.map(({ id, title, genre, description, thumbnailURL, contentType, releaseDate, duration, language, rating }) => ({
        id, title, genre, description, thumbnailURL, contentType, releaseDate, duration, language, rating
    }));
};

export const listAllContent = async (req, res) => {
    try {
        const contents = await Content.findAll();
        const result = filterContentData(contents, req);
        return res.json(result);
    } 
    catch (err) {
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

export const listGenreContent = async (req, res) => {
    const genre = req.params.genre;

    try {
        const contents = await Content.findAll({
            where: {
                genre: {
                    [Op.contains]: [genre]
                }
            }
        });

        if (contents.length === 0) {
            return res.status(404).json({ message: `No content found for genre: ${genre}` });
        }

        const result = filterContentData(contents, req);
        return res.json(result);
    } 
    catch (err) {
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

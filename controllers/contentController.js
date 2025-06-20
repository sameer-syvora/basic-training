import { Content } from "../models/watchlistModel.js";
import { Op } from "sequelize";

export const listAllContent = async (req, res) => {
    try {
        const contents = await Content.findAll();
        return res.json(contents);
    } 
    catch (err) {
        return res.status(500).json({ message: "Server error" });
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

        return res.json(contents);
    } 
    catch (err) {
        return res.status(500).json({ message: "Server error" });
    }
};

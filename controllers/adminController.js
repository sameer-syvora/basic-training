import { Content } from "../models/watchlistModel.js";

export const addContent = async (req, res) => {
    try {
        const content = await Content.create(req.body);
        return res.status(201).json(content);
    } 
    catch (err) {
        return res.status(500).json({ message: "Server Error" });
    }
};

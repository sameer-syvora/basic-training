import { Content } from "../models/watchlistModel.js";

export const getWatchlist = async (req, res) => {
    try {
        const contents = await req.user.getContents();
        return res.json(contents);
    }
    catch (err) {
        console.error("Error fetching watchlist:", err);
        return res.status(500).json({ message: "Server Error" });
    }
};

export const addToWatchlist = async (req, res) => {
    try {
        const content = await Content.findByPk(req.body.contentId);
        if (!content) {
            return res.status(404).json({ message: "Content does not exist" });
        }

        const alreadyExists = await req.user.hasContent(content);
        if (alreadyExists) {
            return res.status(400).json({ message: "Already in watchlist" });
        }

        await req.user.addContent(content);
        return res.json({ message: "Added to watchlist" });
    }
    catch (err) {
        console.error("Error adding to watchlist:", err);
        return res.status(500).json({ message: "Server Error" });
    }
};

export const subscribe = async (req, res) => {
    const days = parseInt(req.body.days);

    if (isNaN(days) || days <= 0) {
        return res.status(400).json({ message: "Invalid number of days" });
    }

    const now = new Date();
    const currentEnd = req.user.subscriptionEnd || now;
    const isExpired = !req.user.subscriptionEnd || new Date(currentEnd) < now;

    req.user.subscriptionStart = isExpired ? now : req.user.subscriptionStart;

    const baseDate = isExpired ? now : new Date(currentEnd);
    const newEndDate = new Date(baseDate);
    newEndDate.setDate(newEndDate.getDate() + days);

    req.user.subscriptionEnd = newEndDate;

    await req.user.save();
    return res.json({ message: `Subscribed for ${days} days`, subscriptionEnd: newEndDate });
};

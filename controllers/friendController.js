import { Friend } from "../models/associations.js";

export const sendFriendRequest = async (req, res) => {
    const senderID = req.user.id;
    const recipientID = req.params.recipientId;

    if (senderID === recipientID) {
        return res.status(400).json({ message: "Cannot send friend request to yourself" });
    }

    try {

        const existing = await Friend.findOne({
            where: { senderID, recipientID }
        });

        if (existing) {
            return res.status(409).json({ message: "Friend request already sent" });
        }

        const existingReverse = await Friend.findOne({
            where: { senderID: recipientID, recipientID: senderID }
        });

        if (existingReverse && existingReverse.status === "Pending") {
            existingReverse.status = "Accepted";
            await existingReverse.save();

            return res.status(200).json({ message: "Existing friend request accepted", request: existingReverse });
        }

        const request = await Friend.create({ senderID, recipientID });
        return res.status(201).json({ message: "Friend request sent", request });
    } 
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to send friend request" });
    }
};

export const respondToRequest = async (req, res) => {
    const recipientID = req.user.id;
    const requestID = req.params.requestId;
    const { status } = req.body;

    if (!["Accepted", "Rejected"].includes(status)) {
        return res.status(400).json({ message: "Status must be either 'Accepted' or 'Rejected'" });
    }

    try {
        const request = await Friend.findByPk(requestID);

        if (!request) {
            return res.status(404).json({ message: "Friend request not found" });
        }

        if (request.recipientID !== recipientID) {
            return res.status(403).json({ message: "You are not authorized to respond to this request" });
        }

        request.status = status;
        await request.save();

        return res.json({ message: `Friend request ${status.toLowerCase()}`, request });
    } 
    catch (error) {
        return res.status(500).json({ message: "Failed to respond to friend request" });
    }
};


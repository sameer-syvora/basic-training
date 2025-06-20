import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/watchlistModel.js";

const generateToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username }, process.env.JWTSECRETCODE, {
        expiresIn: '1d',
    });
};

export const signup = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "Missing required fields" })
    }

    const existingUser = await User.findOne({ where: {email}});

    if(existingUser) return res.status(409).json({ message: "Email already exists"});
    try {
        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashed });

        const token = generateToken(user);
        return res.status(201).json({ token });
    } catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    if( !email || !password ){
        return res.status(400).json({ message: "Email and password required" });
    }

    try{
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: "User not found" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ message: "Wrong password" });

        const token = generateToken(user);
        res.json({ token });
    }
    catch(err){
        return res.status(500).json({ message: "Server error"});
    }
};

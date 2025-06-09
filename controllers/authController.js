import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/associations.js";

const generateToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username }, process.env.JWTSECRETCODE, {
        expiresIn: '1d',
    });
};

export const signup = async (req, res) => {
    const { username, email, password, first_name, last_name, phone_number } = req.body;

    if (!username || !email || !password || !first_name) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(409).json({ message: "Email already exists" });

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username, email, password: hashedPassword, first_name,
            last_name: last_name || null, phone_number: phone_number || null
        });

        const token = generateToken(user);
        return res.status(201).json({ token, "message": "User created successfully"});
    } 
    catch (error) {
        return res.status(500).json({ message: "Error creating user" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({ message: "Email and password required" });

    try {
        const user = await User.findOne({ where: { email } });
        const checkPassword = await bcrypt.compare(password, user.password);
        
        if (!user || !checkPassword)
            return res.status(401).json({ message: "Invalid credentials" });

        const token = generateToken(user);
        console.log(token);
        return res.status(200).json({ token , "message" : "Login Successful"});
    } 
    catch (err) {
        return res.status(500).json({ message: "Server error" });
    }
};

import jwt from "jsonwebtoken";

export const checkToken = (req, res, next) => {
    const tokenHeader = req.headers.authorization;

    if (!tokenHeader || !tokenHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = tokenHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWTSECRETCODE);
        req.user = decoded;
        next();
    } catch {
        return res.status(401).json({ message: "Invalid token" });
    }
};

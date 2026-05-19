const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const config = require("../config");

async function authenticateUser(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "Access denied. No token provided." });
        }

        const token = authHeader.split(" ")[1];
        
        // Verifying using the central config variable we defined in src/config/index.js
        const decoded = jwt.verify(token, config.jwtSecret);

        const user = await prisma.user.findUnique({
            where: { id: decoded.userId }
        });

        if (!user) {
            return res.status(401).json({ success: false, message: "User not found." });
        }

        // Attach full user details (including role) to request
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Invalid or expired token." });
    }
}

function authorizeUser(roles = []) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        if (roles.length && !roles.includes(req.user.role)) {
            return res.status(403).json({ success: false, message: "Access forbidden. Insufficient permissions." });
        }
        next();
    };
}

module.exports = { authenticateUser, authorizeUser };

const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const config = require("../config");
const interviewSocket = require("./interview.socket");

function initializeSocket(server) {
    const io = new Server(server, {
        cors: {
            origin: process.env.FRONTEND_URL || "*",
            methods: ["GET", "POST"]
        }
    });

    // Authentication middleware for socket connections
    io.use((socket, next) => {
        const token = socket.handshake.auth.token;

        if (!token) {
            return next(new Error("Authentication error: No token provided"));
        }

        try {
            const decoded = jwt.verify(token, config.jwtSecret);
            socket.user = decoded;
            next();
        } catch (error) {
            next(new Error("Authentication error: Invalid token"));
        }
    });

    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.user.id}`);

        // Handle interview room events
        interviewSocket(io, socket);

        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.user.id}`);
        });
    });

    return io;
}

module.exports = { initializeSocket };

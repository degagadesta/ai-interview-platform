const interviewRepository = require("../modules/interviews/repositories/interview.repository");

module.exports = (io, socket) => {

    // Join interview room
    socket.on("join-interview", async (interviewId) => {
        try {
            const interview = await interviewRepository.getInterviewById(interviewId);

            if (!interview) {
                socket.emit("error", { message: "Interview not found" });
                return;
            }

            // Verify user is participant
            const userId = socket.user.id;
            if (interview.interviewerId !== userId && interview.candidateId !== userId) {
                socket.emit("error", { message: "Unauthorized access to interview" });
                return;
            }

            socket.join(`interview-${interviewId}`);

            // Notify others in room
            socket.to(`interview-${interviewId}`).emit("user-joined", {
                userId: socket.user.id,
                userName: socket.user.name,
                role: interview.interviewerId === userId ? "interviewer" : "candidate"
            });

            socket.emit("joined-interview", {
                interviewId,
                interview
            });

            console.log(`User ${socket.user.id} joined interview ${interviewId}`);
        } catch (error) {
            socket.emit("error", { message: error.message });
        }
    });

    // Leave interview room
    socket.on("leave-interview", (interviewId) => {
        socket.leave(`interview-${interviewId}`);
        socket.to(`interview-${interviewId}`).emit("user-left", {
            userId: socket.user.id
        });
    });

    // Share code in real-time
    socket.on("code-change", ({ interviewId, code, language, cursorPosition }) => {
        socket.to(`interview-${interviewId}`).emit("code-updated", {
            code,
            language,
            cursorPosition,
            userId: socket.user.id
        });
    });

    // Share code execution results
    socket.on("code-execution", ({ interviewId, result }) => {
        socket.to(`interview-${interviewId}`).emit("execution-result", {
            result,
            userId: socket.user.id
        });
    });

    // Real-time chat messages
    socket.on("chat-message", ({ interviewId, message }) => {
        const chatMessage = {
            userId: socket.user.id,
            userName: socket.user.name,
            message,
            timestamp: new Date()
        };

        io.to(`interview-${interviewId}`).emit("chat-message", chatMessage);
    });

    // Problem selection during interview
    socket.on("select-problem", ({ interviewId, problemId }) => {
        socket.to(`interview-${interviewId}`).emit("problem-selected", {
            problemId,
            selectedBy: socket.user.id
        });
    });

    // Interview status updates
    socket.on("update-interview-status", ({ interviewId, status }) => {
        socket.to(`interview-${interviewId}`).emit("interview-status-changed", {
            status,
            updatedBy: socket.user.id
        });
    });

    // Typing indicators
    socket.on("typing", ({ interviewId, isTyping }) => {
        socket.to(`interview-${interviewId}`).emit("user-typing", {
            userId: socket.user.id,
            isTyping
        });
    });
};

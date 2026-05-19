const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    port: process.env.PORT || 3000,
    databaseUrl: process.env.DATABASE_URL,
    jwtSecret: process.env.JWT_SECRET || "trialtoken",
    judge0: {
        apiUrl: process.env.JUDGE0_API_URL || "https://judge0-ce.p.rapidapi.com",
        apiKey: process.env.JUDGE0_API_KEY,
        apiHost: process.env.JUDGE0_API_HOST || "judge0-ce.p.rapidapi.com"
    }
};

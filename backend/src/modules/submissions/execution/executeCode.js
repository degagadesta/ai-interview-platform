const axios = require("axios");
const config = require("../../../config");

const LANGUAGE_MAP = {
    "javascript": 93, // Node.js 18.15.0
    "python": 92,     // Python 3.11.2
    "java": 91,       // JDK 17.0.6
    "cpp": 75         // Clang 9.0.0
};

async function executeCode(sourceCode, language, stdin = "") {
    const languageId = LANGUAGE_MAP[language.toLowerCase()];
    if (!languageId) {
        throw new Error(`Unsupported language: ${language}`);
    }

    // Judge0 CE uses base64 to avoid encoding issues with special characters
    const base64Code = Buffer.from(sourceCode).toString("base64");
    const base64Stdin = Buffer.from(stdin).toString("base64");

    const headers = {
        "content-type": "application/json"
    };

    // If using RapidAPI, include the required headers
    if (config.judge0.apiKey) {
        headers["x-rapidapi-key"] = config.judge0.apiKey;
        headers["x-rapidapi-host"] = config.judge0.apiHost;
    }

    const options = {
        method: "POST",
        url: `${config.judge0.apiUrl}/submissions`,
        params: { base64_encoded: "true", wait: "true" },
        headers,
        data: {
            source_code: base64Code,
            language_id: languageId,
            stdin: base64Stdin
        }
    };

    try {
        const response = await axios.request(options);
        const { stdout, stderr, status, time, memory } = response.data;

        return {
            stdout: stdout ? Buffer.from(stdout, "base64").toString("utf8") : "",
            stderr: stderr ? Buffer.from(stderr, "base64").toString("utf8") : "",
            status: status.description,
            statusId: status.id,
            time: parseFloat(time) || 0,
            memory: parseInt(memory) || 0
        };
    } catch (error) {
        console.error("Judge0 API execution failed:", error.response?.data || error.message);
        throw new Error("Failed to execute code in sandbox");
    }
}

module.exports = { executeCode };

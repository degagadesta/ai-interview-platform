const axios = require("axios");
const config = require("../../config");
const submissionRepository = require("../submissions/repositories/submission.repository");
const problemRepository = require("../problems/repositories/problem.repository");

async function getInterviewFeedback(submissionId) {
    try {
        const submission = await submissionRepository.getSubmissionById(submissionId);
        if (!submission) {
            throw new Error("Submission not found");
        }

        const problem = await problemRepository.getProblemById(submission.problemId);

        const prompt = `You are an expert technical interviewer. Analyze this coding submission and provide detailed feedback.

Problem: ${problem.title}
Difficulty: ${problem.difficulty}
Description: ${problem.description}

Submitted Code (${submission.language}):
${submission.code}

Submission Status: ${submission.status}
Test Results: ${JSON.stringify(submission.result, null, 2)}

Provide feedback on:
1. Code quality and readability
2. Algorithm efficiency and time complexity
3. Best practices and improvements
4. Overall performance score (0-100)

Format your response as JSON with keys: feedback, strengths, improvements, score`;

        if (!config.openai.apiKey) {
            // Return mock feedback if API key not configured
            return {
                feedback: "AI feedback requires OpenAI API key configuration.",
                strengths: ["Code structure is clear", "Handles basic cases"],
                improvements: ["Consider edge cases", "Optimize time complexity"],
                score: 75,
                mockData: true
            };
        }

        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: config.openai.model,
                messages: [
                    { role: "system", content: "You are an expert technical interviewer providing constructive feedback." },
                    { role: "user", content: prompt }
                ],
                temperature: 0.7,
                max_tokens: 1000
            },
            {
                headers: {
                    "Authorization": `Bearer ${config.openai.apiKey}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const aiResponse = response.data.choices[0].message.content;

        try {
            return JSON.parse(aiResponse);
        } catch (e) {
            // If AI doesn't return valid JSON, wrap it
            return {
                feedback: aiResponse,
                score: 80
            };
        }
    } catch (error) {
        console.error("AI feedback error:", error.message);
        throw error;
    }
}

async function getCodeSuggestions(code, language, problemDescription) {
    try {
        const prompt = `Analyze this ${language} code and suggest improvements:

Problem Context: ${problemDescription}

Code:
${code}

Provide specific suggestions for:
1. Performance optimizations
2. Code readability
3. Better algorithms or data structures
4. Edge cases to handle

Keep suggestions concise and actionable.`;

        if (!config.openai.apiKey) {
            return {
                suggestions: [
                    "Add input validation",
                    "Consider time complexity optimization",
                    "Add error handling"
                ],
                mockData: true
            };
        }

        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: config.openai.model,
                messages: [
                    { role: "system", content: "You are a senior software engineer providing code review." },
                    { role: "user", content: prompt }
                ],
                temperature: 0.7,
                max_tokens: 500
            },
            {
                headers: {
                    "Authorization": `Bearer ${config.openai.apiKey}`,
                    "Content-Type": "application/json"
                }
            }
        );

        return {
            suggestions: response.data.choices[0].message.content
        };
    } catch (error) {
        console.error("AI suggestions error:", error.message);
        throw error;
    }
}

module.exports = {
    getInterviewFeedback,
    getCodeSuggestions
};

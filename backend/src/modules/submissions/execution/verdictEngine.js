const { executeCode } = require("./executeCode");
const { compareOutput } = require("./compareOutput");

async function evaluateSubmission(code, language, testCases) {
    // If no test cases are defined, default to accepted
    if (!testCases || testCases.length === 0) {
        return {
            status: "ACCEPTED",
            results: []
        };
    }

    const results = [];
    let overallStatus = "ACCEPTED";

    for (let i = 0; i < testCases.length; i++) {
        const { input, expectedOutput } = testCases[i];
        
        try {
            const execution = await executeCode(code, language, input);
            
            let caseStatus = "ACCEPTED";
            
            // Judge0 Status IDs:
            // 3: Accepted
            // 4: Wrong Answer
            // 5: Time Limit Exceeded
            // 6: Compilation Error
            // 7-11: Runtime Errors
            if (execution.statusId === 3) {
                const passed = compareOutput(execution.stdout, expectedOutput);
                caseStatus = passed ? "ACCEPTED" : "WRONG_ANSWER";
            } else if (execution.statusId === 4) {
                caseStatus = "WRONG_ANSWER";
            } else if (execution.statusId === 5) {
                caseStatus = "TIME_LIMIT_EXCEEDED";
            } else if (execution.statusId === 6) {
                caseStatus = "COMPILATION_ERROR";
            } else {
                caseStatus = "RUNTIME_ERROR";
            }

            results.push({
                testCaseIndex: i,
                passed: caseStatus === "ACCEPTED",
                status: caseStatus,
                stdout: execution.stdout,
                stderr: execution.stderr,
                time: execution.time,
                memory: execution.memory
            });

            // The overall status takes the first failing status encountered
            if (caseStatus !== "ACCEPTED" && overallStatus === "ACCEPTED") {
                overallStatus = caseStatus;
            }

        } catch (error) {
            results.push({
                testCaseIndex: i,
                passed: false,
                status: "RUNTIME_ERROR",
                error: error.message
            });
            
            if (overallStatus === "ACCEPTED") {
                overallStatus = "RUNTIME_ERROR";
            }
        }
    }

    return {
        status: overallStatus,
        results
    };
}

module.exports = { evaluateSubmission };

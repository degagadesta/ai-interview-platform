const { executeCode } = require("./modules/submissions/execution/executeCode");

async function runTest() {
    console.log("Testing Judge0 API integration...");
    
    // Simple JavaScript code that reads from standard input and prints the sum
    const code = `
const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\\n');
const sum = parseInt(input[0]) + parseInt(input[1]);
console.log(sum);
    `;
    
    const stdin = "12\n13";
    
    try {
        const result = await executeCode(code, "javascript", stdin);
        console.log("Execution Result:", result);
        if (result.stdout.trim() === "25") {
            console.log("SUCCESS: Code executed successfully and returned the correct sum!");
        } else {
            console.log("FAILED: Expected output 25 but got:", result.stdout);
        }
    } catch (error) {
        console.error("TEST FAILED with error:", error);
    }
}

runTest();

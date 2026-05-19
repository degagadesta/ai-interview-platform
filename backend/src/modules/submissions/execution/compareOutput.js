function compareOutput(actual, expected) {
    if (actual === undefined || expected === undefined) return false;
    
    // Clean and normalize actual vs expected output (removes leading/trailing whitespaces and normalizes newlines)
    const cleanActual = actual.toString().trim().replace(/\r\n/g, "\n");
    const cleanExpected = expected.toString().trim().replace(/\r\n/g, "\n");
    
    return cleanActual === cleanExpected;
}

module.exports = { compareOutput };

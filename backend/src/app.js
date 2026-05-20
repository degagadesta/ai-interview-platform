const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const morgan = require("morgan")
const authroutes = require("./modules/auth/routes/auth.routes")
const problemRoutes = require("./modules/problems/routes/problem.routes");
const interviewRoutes = require("./modules/interviews/routes/interview.routes");
const submissionRoutes = require("./modules/submissions/routes/submission.routes");
const aiRoutes = require("./modules/ai/ai.routes");

const app = express()
app.use(cors())
app.use(express.json())
app.use(helmet())
app.use(morgan("dev"))
app.use("/api/auth", authroutes)
app.use("/api/problems", problemRoutes);
app.use("/api/interviews", interviewRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/ai", aiRoutes);

app.use((err, req, res, next) => {

    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error"
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})




module.exports = app


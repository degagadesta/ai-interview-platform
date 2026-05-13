const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const morgan = require("morgan")
const authroutes = require("./modules/auth/routes/auth.routes")

const app = express()
app.use(cors())
app.use(express.json())
app.use(helmet())
app.use(morgan("dev"))
app.use("/api/auth", authroutes)

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


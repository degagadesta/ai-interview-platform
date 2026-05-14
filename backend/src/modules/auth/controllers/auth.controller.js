const authService = require("../services/auth.service")

async function register(req, res, next) {
    try {
        const { email, password, name } = req.body
        const result = await authService.register({ email, name, password })
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result
        })
    } catch (error) {
        next(error)
    }
}
async function login(req, res, next) {
    try {
        const { email, password } = req.body
        const result = await authService.login(email, password)
        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: result
        })
    } catch (error) {
        next(error)
    }
}
module.exports = { register, login }
async function validateRegister(req, res, next) {
    try {
        const { email, password, name } = req.body
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if (!email || !emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email address"
            })
        }
        if (!password || password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long"
            })
        }
        if (!name || name.length < 3) {
            return res.status(400).json({
                success: false,
                message: "Name must be at least 3 characters long"
            })
        }
        next()

    } catch (error) {
        next(error)
    }
}
async function validateLogin(req, res, next) {
    try {
        const { email, password } = req.body
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if (!email || !emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email address"
            })
        }
        if (!password || password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long"
            })
        }
        next()
    } catch (error) {
        next(error)
    }
}
module.exports = { validateRegister, validateLogin }
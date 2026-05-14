const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { createUser, findUserByEmail } = require("../repositories/auth.repository")
async function register(userData) {
    const { email, password, name } = userData
    const hashedPassword = await bcrypt.hash(password, 10)
    const existingUser = await findUserByEmail(email)
    if (existingUser) {
        throw new Error("Email already exists")
    }
    return await createUser({ email, password: hashedPassword, name })
}
async function login(email, password) {
    const user = await findUserByEmail(email)
    if (!user) {
        throw new Error("User not found")
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error("Invalid credentials")
    }
    const payload = {
        userId: user.id
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" })
    return {
        token,
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
        }
    }
}
module.exports = { register, login }

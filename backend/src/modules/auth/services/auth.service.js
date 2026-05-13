const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
async function register(userData) {
    const { email, password, name } = userData
    if (!email || !password) {
        throw new Error("Email and password are required")
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    return await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name: name || email,
        },
        select: {
            id: true,
            email: true,
            name: true
        }
    })
}
async function login(email, password) {
    if (!email || !password) {
        throw new Error("Email and password are requires")
    }
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })
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

const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

async function createUser(userData) {
    return await prisma.user.create({
        data: userData,
        select: { id: true, email: true, name: true }
    })
}
async function findUserByEmail(email) {
    return await prisma.user.findUnique({
        where: { email }
    })
}
module.exports = { createUser, findUserByEmail }
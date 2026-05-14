const dotenv = require("dotenv")
dotenv.config()
const app = require("./app")

const { PrismaClient } = require("@prisma/client")

const port = process.env.PORT || 3000
const prisma = new PrismaClient()

async function startServer() {
    try {
        await prisma.$connect()
        console.log("Connected to database")
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`)
        })

    } catch (err) {
        console.error("Error connecting to database", err)
        process.exit(1)
    }
}
startServer()

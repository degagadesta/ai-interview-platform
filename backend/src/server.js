const dotenv = require("dotenv")
dotenv.config()
const app = require("./app")
const http = require("http")
const { initializeSocket } = require("./sockets")
const { PrismaClient } = require("@prisma/client")

const port = process.env.PORT || 3000
const prisma = new PrismaClient()

async function startServer() {
    try {
        await prisma.$connect()
        console.log("Connected to database")

        const server = http.createServer(app)

        // Initialize WebSocket
        const io = initializeSocket(server)
        app.set("io", io)

        server.listen(port, () => {
            console.log(`Server is running on port ${port}`)
            console.log(`WebSocket server initialized`)
        })

    } catch (err) {
        console.error("Error connecting to database", err)
        process.exit(1)
    }
}
startServer()

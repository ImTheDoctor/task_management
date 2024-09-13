import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import connectDB from "./configs/db_connect.js"
import { taskRoute } from "./routes/index.js"

dotenv.config()
const app = express()
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000

async function startServer() {
    try {
        await connectDB();
        
        app.get("/", (req, res) => {
            res.send("Welcome to the application!");
        });

        app.use("/api/tasks", taskRoute)

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}.`);
        });
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
}

startServer();
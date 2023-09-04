import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";//cross origin requests
import teeRoutes from "./routes/tee.routes.js"; 
import mongoose from "mongoose";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({limit: "50mb"}));
app.use('/api/v1/tee', teeRoutes);
app.get("/", (req, res) => {
    res.status(200).json({message : "Hello from TEE API"});
});
app.listen(8080, () => console.log("Server is running on port 8080"));